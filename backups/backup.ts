import { list, type ListBlobResult, type ListBlobResultBlob } from "@vercel/blob";
import { type ChildProcess, spawn } from "child_process";
import { mkdir, rename, writeFile } from "fs/promises";
import path from "path";
import { text } from "stream/consumers";
import { fileURLToPath } from "url";

const readEnv = (names: string[]) => {
  const values = names.map((name) => process.env[name] ?? "");
  const missing = names.filter((_, i) => !values[i]);
  if (missing.length > 0) {
    throw new Error(`Set the following in .env.backup: ${missing.join(", ")}`);
  }
  return values;
};

const exitCode = (child: ChildProcess) =>
  new Promise<number | null>((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
  });

const exportDatabaseAsSql = async (databaseUrl: string) => {
  const pgDump = spawn(
    "docker",
    [
      "run",
      "--rm",
      "postgres:18",
      "pg_dump",
      "--no-owner",
      "--no-privileges",
      `--dbname=${databaseUrl}`,
    ],
    // 入力：使わない、出力：SQL として受け取る、エラー：画面にそのまま出す
    { stdio: ["ignore", "pipe", "inherit"] },
  );
  const [sql, code] = await Promise.all([text(pgDump.stdout), exitCode(pgDump)]);
  if (code !== 0) throw new Error("pg_dump failed. See the message above.");
  return sql;
};

const saveSql = async (sql: string, backupsDir: string) => {
  const dbDir = path.join(backupsDir, "db");
  await mkdir(dbDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const dumpFile = path.join(dbDir, `${today}.sql`);
  await writeFile(dumpFile, sql);
  console.log(`Database: ${dumpFile}`);
};

const downloadPhotos = async (blobs: ListBlobResultBlob[], backupsDir: string) => {
  for (const blob of blobs) {
    const file = path.join(backupsDir, "photos", blob.pathname);
    const res = await fetch(blob.url);
    if (!res.ok) throw new Error(`Downloading ${blob.url} failed: ${res.status}`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(`${file}.tmp`, Buffer.from(await res.arrayBuffer()));
    await rename(`${file}.tmp`, file);
  }
};

const listPhotos = async (blobToken: string) => {
  const blobs: ListBlobResultBlob[] = [];
  let page: ListBlobResult | undefined;
  do {
    page = await list({ cursor: page?.cursor, token: blobToken });
    blobs.push(...page.blobs);
  } while (page.hasMore);
  console.log(`Photos: ${blobs.length}`);
  return blobs;
};

const main = async () => {
  try {
    const [databaseUrl, blobToken] = readEnv(["DATABASE_URL", "BLOB_READ_WRITE_TOKEN"]);
    const backupsDir = path.dirname(fileURLToPath(import.meta.url));

    const sql = await exportDatabaseAsSql(databaseUrl);
    await saveSql(sql, backupsDir);

    const blobs = await listPhotos(blobToken);
    await downloadPhotos(blobs, backupsDir);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

await main();
