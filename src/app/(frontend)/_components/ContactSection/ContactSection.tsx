export default function ContactSection() {
  return (
    <section id="contact" className="flex flex-col items-center text-[19px] md:text-[22px]">
      <h1 className="sr-only">Contact</h1>
      <a
        className="flex min-h-12 items-center hover:text-muted md:min-h-13"
        href="mailto:dminowa@gmail.com"
        aria-label="Email Daisuke Minowa"
      >
        Email
      </a>
      <a
        className="flex min-h-12 items-center hover:text-muted md:min-h-13"
        href="https://www.instagram.com/daisuke_minowa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram profile of Daisuke Minowa"
      >
        Instagram
      </a>
    </section>
  );
}
