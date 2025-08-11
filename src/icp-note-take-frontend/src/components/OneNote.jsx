/**
 * OneNote.jsx
 *
 * Renders a single note card, supporting:
 * - View mode: displays title, timestamp, and content.
 * - Edit mode: allows modifying title/content with Save/Cancel actions.
 * - Delete: triggers parent-provided callback to remove note.
 *
 * Notes
 * -----
 * - Editing updates local state only — persistence is handled in parent logic.
 * - Title/content edits are reverted if Cancel is clicked.
 */
import { useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

/**
 * @component
 * @param {Object} props
 * @param {string} props.id - Unique note identifier.
 * @param {string} props.noteTitle - Title of the note.
 * @param {string} props.noteDate - Display-friendly date string.
 * @param {string} props.noteContent - Full text content of the note.
 * @param {Function} props.deleteClick - Handler for deleting the note.
 * @param {Function} props.setCurrentNotes - State setter for notes array in parent.
 */
function OneNote({ id, noteTitle, noteDate, noteContent, deleteClick, setCurrentNotes }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(noteTitle);
    const [editedContent, setEditedContent] = useState(noteContent);

    /** Enable edit mode. */
    const handleEdit = () => setIsEditing(true);

    /**
     * Save edited note to local state and exit edit mode.
     * @param {string} id - ID of the note being saved.
     */
    function handleSave(id) {
        try {
            setCurrentNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id
                        ? {
                              ...note,
                              title: editedTitle,
                              content: editedContent,
                          }
                        : note
                )
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update note:", error);
            alert("Failed to add your changes.");
        }
    }

    /** Cancel editing and revert to original props. */
    const cancelEditing = () => {
        setEditedTitle(noteTitle);
        setEditedContent(noteContent);
        setIsEditing(false);
    };

    return (
        <div className="note">
            {isEditing ? (
                <>
                    {/* Editable fields */}
                    <input
                        className="note-title"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="note-content"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />

                    {/* Action buttons */}
                    <button className="button-left" onClick={cancelEditing}>
                        <Tooltip title="Cancel Edit">
                            <CloseIcon />
                        </Tooltip>
                    </button>
                    <button className="button-right" onClick={() => handleSave(id)}>
                        <Tooltip title="Save Changes">
                            <SaveIcon />
                        </Tooltip>
                    </button>
                </>
            ) : (
                <>
                    {/* Static display */}
                    <div className="note-title-date">
                        <h1 className="note-title">{noteTitle}</h1>
                        <p className="note-date">{noteDate}</p>
                    </div>
                    <div className="note-content">{noteContent}</div>

                    {/* Action buttons */}
                    <button className="button-right" onClick={handleEdit}>
                        <Tooltip title="Edit Note">
                            <EditIcon />
                        </Tooltip>
                    </button>
                    <button className="button-left" onClick={() => deleteClick(id)}>
                        <Tooltip title="Delete Note">
                            <DeleteOutlineIcon />
                        </Tooltip>
                    </button>
                </>
            )}
        </div>
    );
}

export default OneNote;
