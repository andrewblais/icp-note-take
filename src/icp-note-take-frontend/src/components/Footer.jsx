/**
 * Footer.jsx
 *
 * Renders external API attribution links for jokes and quotes,
 * along with the current year.
 *
 * Notes
 * -----
 * - Icons are provided by FontAwesome.
 * - Links open in a new tab with `rel="noopener noreferrer"` for security.
 */

import formatDate from "./formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink, faFaceGrinWide } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @component
 * @returns {JSX.Element} Footer containing external source links and dynamic year display.
 */
function Footer() {
    return (
        <footer>
            <div className="footer-all">
                <div className="footer-links">
                    {/* External link to dad joke API: */}
                    <a target="_blank" href="https://icanhazdadjoke.com/" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFaceSmileWink} fontSize="1.05rem" />
                        &nbsp;icanhazdadjoke&nbsp;
                        <FontAwesomeIcon icon={faFaceGrinWide} fontSize="1.05rem" />
                    </a>
                    {/* External link to FavQs quote API: */}
                    <a target="_blank" href="https://favqs.com/" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faQuoteLeft} fontSize="1.05rem" />
                        &nbsp;favqs&nbsp;
                        <FontAwesomeIcon icon={faQuoteRight} fontSize="1.05rem" />
                    </a>
                </div>
                {/* Dynamic copyright */}
                <div className="footer-date">&copy; {formatDate("year")}</div>
            </div>
        </footer>
    );
}

export default Footer;
