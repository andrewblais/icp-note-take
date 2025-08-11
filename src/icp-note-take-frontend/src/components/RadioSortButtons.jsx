/**
 * RadioSortButtons.jsx
 *
 * Group of radio buttons to sort notes by date or title, ascending/descending.
 * Pure UI; sorting logic lives in the parent via the `onSort` handler.
 */

import RadioSortButton from "./RadioSortButton";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faA, faZ } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

/**
 * @component
 * @param {Object} props
 * @param {(e:React.ChangeEvent<HTMLInputElement>)=>void} props.onSort - Parent-provided sort handler.
 */
function RadioSortButtons({ onSort }) {
    return (
        <div
            className="btn-group"
            role="group"
            aria-label="Radio buttons toggle sort order by date or alphabetically.">
            <RadioSortButton
                identifier="date-descending"
                onSort={onSort}
                isDefaultChecked={true}
                buttonText={
                    <Tooltip title="Sort: New to Old">
                        <span aria-hidden="true">
                            <FontAwesomeIcon icon={faArrowDown} />
                            <FontAwesomeIcon icon={faClock} />
                        </span>
                    </Tooltip>
                }
            />

            <RadioSortButton
                identifier="date-ascending"
                onSort={onSort}
                isDefaultChecked={false}
                buttonText={
                    <Tooltip title="Sort: Old to New">
                        <span aria-hidden="true">
                            <FontAwesomeIcon icon={faClock} />
                            <FontAwesomeIcon icon={faArrowUp} />
                        </span>
                    </Tooltip>
                }
            />

            <RadioSortButton
                identifier="title-ascending"
                onSort={onSort}
                isDefaultChecked={false}
                buttonText={
                    <Tooltip title="Sort: Alphabetical">
                        <span aria-hidden="true">
                            <FontAwesomeIcon icon={faA} />
                            <FontAwesomeIcon icon={faZ} />
                        </span>
                    </Tooltip>
                }
            />

            <RadioSortButton
                identifier="title-descending"
                onSort={onSort}
                isDefaultChecked={false}
                buttonText={
                    <Tooltip title="Sort: Reverse Alphabetical">
                        <span aria-hidden="true">
                            <FontAwesomeIcon icon={faZ} />
                            <FontAwesomeIcon icon={faA} />
                        </span>
                    </Tooltip>
                }
            />
        </div>
    );
}

export default RadioSortButtons;
