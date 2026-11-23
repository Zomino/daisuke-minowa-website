# 簑輪大助 ポートフォリオサイト

[English](README.md)

画家である父、簑輪大助の[作品サイト](https://www.daisukeminowa.com)です。作品や経歴は、父が自分で管理画面から更新できます。

Next.js、Payload、Neon（Postgres）、Vercel Blob で作り、Vercel で公開しています。

## 開発

1. `.env.local` に次の値を設定する（本番の値は使わない）。
   - `PAYLOAD_SECRET`：任意の長い文字列
   - `BLOB_READ_WRITE_TOKEN`：プレビュー用 Blob のトークン
2. DB と開発サーバーを起動する。

   ```sh
   npm ci
   docker compose up --detach
   npm run dev
   ```

## 公開

1. `src/collections/` のデータ定義を変えた場合は、次を実行してコミットする。

   ```sh
   npx payload migrate:create
   npx payload generate:types
   ```

2. `main` にマージする（自動で公開される）。

## バックアップ

1. `.env.backup` に本番の値を設定する。
   - `DATABASE_URL`：Vercel の `DATABASE_URL_UNPOOLED` の値
   - `BLOB_READ_WRITE_TOKEN`：本番用 Blob のトークン
2. Docker を起動して、次を実行する。

   ```sh
   npm run backup
   ```

3. `backups/` に保存されたことを確かめる（個人情報を含むので共有しない）。

## 復元

1. 復元先を新しく作る。
   - 空の Postgres 18
   - 公開設定の Vercel Blob
2. `.env.restore` に次の値を設定する（引用符は付けない）。
   - `DATABASE_URL`：新しい DB の直接接続先
3. データを復元する。

   ```sh
   docker run --rm --interactive \
     --env-file .env.restore \
     postgres:18 \
     sh -c 'psql --single-transaction --set=ON_ERROR_STOP=1 --dbname="$DATABASE_URL"' \
     < backups/db/YYYY-MM-DD.sql
   ```

4. `backups/photos/` の中身を、フォルダ構成とファイル名を変えずに Blob へアップロードする。
5. `next.config.ts` の Blob のホスト名を新しい値に変える。
6. Vercel の次の環境変数を新しい値に変える。
   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED`
   - `BLOB_READ_WRITE_TOKEN`
7. デプロイする。
