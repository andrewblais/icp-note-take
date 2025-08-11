/**
 * Header.jsx
 *
 * Displays the app title with a linked pencil icon and the current date.
 * The date format is controlled by `formatDate()` (default: `"full"`).
 *
 * Notes
 * -----
 * - The pencil icon links to the Visual Studio Code homepage.
 * - This component does not accept props — content is fixed at render time.
 */

import formatDate from "./formatDate";

/**
 * @component
 * @returns {JSX.Element} Header section with app title and current date.
 */
function Header() {
    return (
        <header className="header">
            <div className="page-title">
                <a href="https://code.visualstudio.com/" target="_blank">
                    <img className="pencil-img" src="/pencil_120.png" />
                </a>
                <h1>note-take</h1>
            </div>
            <h3>{formatDate("full")}</h3>
        </header>
    );
}

export default Header;
