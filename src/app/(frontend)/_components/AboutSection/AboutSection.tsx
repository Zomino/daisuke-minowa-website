import config from '@payload-config';
import Image from 'next/image';
import { getPayload } from 'payload';

import profileImage from '@/app/(frontend)/_images/profile.jpg';

import AccessibleEnDash from '@/components/AccessibleEnDash/AccessibleEnDash';

export default async function AboutSection() {
    const payload = await getPayload({ config });
    const published = { _status: { equals: 'published' } } as const;
    const [{ docs: sortedExhibitions }, { docs: sortedEducation }] = await Promise.all([
        payload.find({
            collection: 'exhibition-entries',
            where: published,
            sort: '-date_from',
            limit: 0,
        }),
        payload.find({
            collection: 'education-entries',
            where: published,
            sort: '-year_from',
            limit: 0,
        }),
    ]);

    // 年は UTC の1月1日に、日付は UTC の正午で保存している。日がずれないよう、UTC で表示する。
    const formatDate = (value: string | number) => {
        const date = typeof value === 'number' ? new Date(Date.UTC(value, 0, 1)) : new Date(value);
        return {
            date,
            display: date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC',
            }),
        };
    };

    return (
        <section id="about">
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">About</h2>
            <div className="relative mx-auto mt-14 w-full overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
                <Image
                    alt="Photo of Daisuke Minowa" // Next.js の Image では必須の項目。
                    className="object-contain saturate-60"
                    // 高さと幅は、元の画像の大きさに合わせる。
                    // 高さがないと、画像が表示されない。
                    height={3264}
                    width={2448}
                    placeholder="blur" // 読み込み中はぼかした画像を出して、なめらかに表示する。
                    src={profileImage} // 読み込んだ画像をそのまま src に渡す。Next.js が正しく最適化できるようにするため。
                />
                {/* 上と下に重ねるグラデーション。 */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            </div>
            <h3 className="sr-only">Bio</h3>
            <p className="mx-auto mt-20 max-w-120 px-5 text-center">
                Born in Tokyo in 1966. Moved to the UK in 1986. Living and working in London.
            </p>
            <div className="mt-18 flex flex-col items-center gap-15 px-5">
                <div className="w-full max-w-4xl text-center">
                    <h3 className="text-xl tracking-widest uppercase">Exhibitions</h3>
                    <ul className="mt-8 space-y-6">
                        {sortedExhibitions.map((entry) => (
                            <li key={entry.id}>
                                {/* 見た目では名前と日付の順を flexbox で入れ替えるが、ページの構造は正しい順のままにする。 */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">
                                        {entry.event_name}
                                    </h4>
                                    <p className="text-black/70 italic">
                                        {(() => {
                                            const { date, display } = formatDate(entry.date_from);
                                            return (
                                                <time dateTime={date.toISOString()}>{display}</time>
                                            );
                                        })()}
                                        {entry.date_to && (
                                            <>
                                                <AccessibleEnDash />
                                                {(() => {
                                                    const { date, display } = formatDate(
                                                        entry.date_to
                                                    );
                                                    return (
                                                        <time dateTime={date.toISOString()}>
                                                            {display}
                                                        </time>
                                                    );
                                                })()}
                                            </>
                                        )}
                                    </p>
                                </div>
                                {entry.notes && (
                                    <p className="text-sm text-black/70 italic">{entry.notes}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full max-w-4xl text-center">
                    <h3 className="text-xl tracking-widest uppercase">Education</h3>
                    <ul className="mt-8 space-y-6">
                        {sortedEducation.map((entry) => (
                            <li key={entry.id}>
                                {/* 見た目では名前と日付の順を flexbox で入れ替えるが、ページの構造は正しい順のままにする。 */}
                                <div className="flex flex-col-reverse">
                                    <h4 className="text-lg font-extralight tracking-wider">
                                        {entry.experience_name}
                                    </h4>
                                    <span className="text-black/70 italic">
                                        {(() => {
                                            const { date, display } = formatDate(entry.year_from);
                                            return (
                                                <time dateTime={date.toISOString()}>{display}</time>
                                            );
                                        })()}
                                        {entry.year_to && (
                                            <>
                                                <AccessibleEnDash />
                                                {(() => {
                                                    const { date, display } = formatDate(
                                                        entry.year_to
                                                    );
                                                    return (
                                                        <time dateTime={date.toISOString()}>
                                                            {display}
                                                        </time>
                                                    );
                                                })()}
                                            </>
                                        )}
                                    </span>
                                </div>
                                {entry.notes && (
                                    <p className="text-sm text-black/70 italic">{entry.notes}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
