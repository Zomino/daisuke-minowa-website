export default function AccessibleEnDash() {
    return (
        <>
            <span className="sr-only">to</span>
            <span aria-hidden>
                {/* 改行されない空白、エンダッシュ、改行されない空白の順。 */}
                {'\u00A0'}
                {'\u2013'}
                {'\u00A0'}
            </span>
        </>
    );
}
