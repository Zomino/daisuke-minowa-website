export default function Body({ children }: { children: React.ReactNode }) {
  // 中身が短いページでも、フッターが画面の下に来るようにする。
  return <body className="flex min-h-svh flex-col">{children}</body>;
}
