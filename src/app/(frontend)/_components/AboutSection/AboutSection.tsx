import config from "@payload-config";
import { getPayload } from "payload";

import AccessibleEnDash from "@/components/AccessibleEnDash/AccessibleEnDash";

// 日付は UTC の正午で保存している。日がずれないよう、UTC で読んで表示する。
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
  date.toLocaleDateString("en-GB", { ...options, timeZone: "UTC" });

/** 「30 July – 4 August 2024」「8 – 12 May 2024」のように、終わりと同じ年や月は始まりから省く。 */
function ExhibitionDates({ from, to }: { from: string; to?: string | null }) {
  const start = new Date(from);
  const end = to ? new Date(to) : null;
  const isSameYear = end && start.getUTCFullYear() === end.getUTCFullYear();
  const isSameMonth = isSameYear && start.getUTCMonth() === end.getUTCMonth();

  return (
    <>
      <time dateTime={start.toISOString().slice(0, 10)}>
        {formatDate(start, {
          day: "numeric",
          month: isSameMonth ? undefined : "long",
          year: isSameYear ? undefined : "numeric",
        })}
      </time>
      {end && (
        <>
          <AccessibleEnDash />
          <time dateTime={end.toISOString().slice(0, 10)}>
            {formatDate(end, { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </>
      )}
    </>
  );
}

export default async function AboutSection() {
  const payload = await getPayload({ config });
  const published = { _status: { equals: "published" } } as const;
  const [{ docs: sortedExhibitions }, { docs: sortedEducation }] = await Promise.all([
    payload.find({
      collection: "exhibition-entries",
      where: published,
      sort: "-date_from",
      limit: 0,
    }),
    payload.find({
      collection: "education-entries",
      where: published,
      sort: "-year_from",
      limit: 0,
    }),
  ]);

  return (
    <section id="about" className="mx-auto flex max-w-110 flex-col gap-18">
      <h1 className="sr-only">About</h1>
      <p className="text-[19px] leading-[1.8] text-pretty md:text-[22px]">
        Born in Tokyo in 1966. Moved to the UK in 1986. Living and working in London.
      </p>
      <section className="flex flex-col gap-7">
        <h2 className="font-medium tracking-[0.16em] uppercase md:text-[17px]">Exhibitions</h2>
        <ul className="flex flex-col gap-6">
          {sortedExhibitions.map((entry) => (
            <li key={entry.id} className="flex flex-col">
              <h3>{entry.event_name}</h3>
              {entry.location && <p className="text-sm text-muted">{entry.location}</p>}
              <p className="text-sm text-muted">
                <ExhibitionDates from={entry.date_from} to={entry.date_to} />
              </p>
              {entry.notes && <p className="text-sm text-muted">{entry.notes}</p>}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-7">
        <h2 className="font-medium tracking-[0.16em] uppercase md:text-[17px]">Education</h2>
        <ul className="flex flex-col gap-6">
          {sortedEducation.map((entry) => (
            <li key={entry.id} className="flex flex-col">
              <h3>{entry.experience_name}</h3>
              <p className="text-sm text-muted">
                <time dateTime={String(entry.year_from)}>{entry.year_from}</time>
                {entry.year_to && (
                  <>
                    <AccessibleEnDash />
                    <time dateTime={String(entry.year_to)}>{entry.year_to}</time>
                  </>
                )}
              </p>
              {entry.notes && <p className="text-sm text-muted">{entry.notes}</p>}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
