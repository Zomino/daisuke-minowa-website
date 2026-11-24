// Next 16 からは、スロットごとに default がないとビルドが失敗する。
// [...slug] がホーム以外のすべての URL に合うので、実際に使われることはない。
export default function Default() {
  return null;
}
