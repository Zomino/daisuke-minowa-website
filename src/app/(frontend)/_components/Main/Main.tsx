export default function Main({ children }: { children: React.ReactNode }) {
  // 残りの高さいっぱいに広げる。Contact はこの中で、リンクを上下中央に置く。
  return <main className="flex grow flex-col px-4 md:px-8">{children}</main>;
}
