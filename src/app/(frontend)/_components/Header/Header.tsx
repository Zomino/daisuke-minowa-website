export default function Header({ children }: { children: React.ReactNode }) {
  // ホーム以外では、中のナビに data-sticky が付くので、header ごと画面の上に貼り付ける。
  // ホームの header は写真なので、貼り付けない。
  return (
    <header className="z-50 has-[[data-sticky]]:sticky has-[[data-sticky]]:top-0">
      {children}
    </header>
  );
}
