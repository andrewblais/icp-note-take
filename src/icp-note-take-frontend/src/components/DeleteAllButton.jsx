/**
 * DeleteAllButton.jsx
 *
 * Renders a flaming dumpster icon button for clearing all notes.
 * Delegates deletion logic to the parent via `deleteAllNotes`.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpsterFire } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";

/**
 * @component
 * @param {Object} props
 * @param {Function} props.deleteAllNotes - Callback to remove all notes from state and backend.
 */
function DeleteAllButton({ deleteAllNotes }) {
    return (
        <>
            <button className="btn-dumpster btn" onClick={deleteAllNotes}>
                <Tooltip title="Delete All Notes">
                    <FontAwesomeIcon icon={faDumpsterFire} />
                </Tooltip>
            </button>
            <div className="delete-all"></div>
        </>
    );
}

export default DeleteAllButton;
