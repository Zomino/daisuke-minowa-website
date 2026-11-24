import Nav from "@/app/(frontend)/_components/Nav/Nav";

// ホーム以外のすべてのページの header。ページを足しても、ここを増やさずに済む。
// default.tsx ではなくここに置くのは、リンクで移ったときに default.tsx が使われず、
// 前のページの header（ホームの写真）が残ってしまうため。
export default function Header() {
  return <Nav />;
}
