export default function AccessibleEnDash() {
    return (
        <>
            <span className="sr-only">to</span>
            <span aria-hidden>
                {/* A non-breaking space followed by an en dash and another non-breaking space. */}
                {'\u00A0'}
                {'\u2013'}
                {'\u00A0'}
            </span>
        </>
    );
}
