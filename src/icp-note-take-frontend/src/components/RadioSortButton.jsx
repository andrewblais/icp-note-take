/**
 * RadioSortButton.jsx
 *
 * Single radio button used within the sort control group.
 * Delegates change handling to parent via `onSort`.
 *
 * Notes
 * -----
 * - `identifier` doubles as the input's id and value for simplicity.
 * - `buttonText` can be plain text or JSX (icons + tooltips).
 */

/**
 * @component
 * @param {Object} props
 * @param {string}   props.identifier        - Unique id/value for the radio input.
 * @param {Function} props.onSort            - Change handler from parent (receives event).
 * @param {boolean}  props.isDefaultChecked  - Whether this option is selected by default.
 * @param {React.ReactNode} props.buttonText - Label content (text or JSX).
 */
function RadioSortButton({ identifier, onSort, isDefaultChecked, buttonText }) {
    return (
        <>
            <input
                type="radio"
                className="btn-check"
                id={identifier}
                name="sort"
                value={identifier}
                autoComplete="off"
                onChange={onSort}
                defaultChecked={isDefaultChecked}
            />
            <label className="btn btn-outline-primary" htmlFor={identifier}>
                {buttonText}
            </label>
        </>
    );
}

export default RadioSortButton;
