export default function Footer() {
  // サーバーで描画するので、表示のたびに値が変わることはない。
  // oxlint-disable-next-line react/purity
  const year = new Date().getFullYear();

  return (
    <footer className="mt-15 flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted md:p-8">
      <p>
        &copy; <time dateTime={year.toString()}>{year}</time> Daisuke Minowa
      </p>
      <a
        className="flex min-h-11 items-center hover:text-ink"
        href="https://www.instagram.com/daisuke_minowa"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </footer>
  );
}
