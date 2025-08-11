/**
 * formatDate.js
 *
 * Presentation utilities for date/time formatting.
 * Motoko canister provides a canonical timestamp (ns since epoch);
 * the UI formats that timestamp into human-readable strings.
 */

/**
 * Format a Date into a human-readable string.
 *
 * Accepts a Date object (defaults to "now") and returns one of:
 *  - "full":  "Wednesday, April 3, 2025, 13:45"
 *  - "abbr":  "4/3/2025 13:45"
 *  - "year":  "2025"
 *
 * @param {"full"|"abbr"|"year"} [format="full"] - Output style.
 * @param {Date} [dateObj=new Date()] - Date instance to format.
 * @returns {string} Formatted date string.
 *
 * @example
 * formatDate("full", new Date()); // "Wednesday, April 3, 2025, 13:45"
 */
function formatDate(format = "full", dateObj = new Date()) {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = daysOfWeek[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const time = dateObj.toTimeString().slice(0, 5);

    if (format === "full") return `${day}, ${month} ${date}, ${year}, ${time}`;
    if (format === "abbr") return `${dateObj.toLocaleDateString()} ${time}`;
    if (format === "year") return year;
    return `${dateObj.toLocaleDateString()} ${time}`;
}

/**
 * Convert a Motoko timestamp (ns since epoch) to a formatted string.
 *
 * Accepts either a bigint or number of nanoseconds. Converts to milliseconds
 * (Number) for JS Date, then delegates to `formatDate`.
 *
 * @param {bigint|number} ns - Nanoseconds since epoch (Motoko `Time.now()`).
 * @param {"full"|"abbr"|"year"} [format="abbr"] - Output style.
 * @returns {string} Formatted date string.
 *
 * @example
 * moTimeStampFormat(1712148300000000000n, "abbr"); // "4/3/2025 13:45"
 */
function moTimeStampFormat(ns, format = "abbr") {
    // Convert ns -> ms, handling bigint or number without precision loss for bigint.
    const ms = typeof ns === "bigint" ? Number(ns / 1_000_000n) : Math.floor(ns / 1e6);

    const d = new Date(ms);
    return formatDate(format, d);
}

export default formatDate;
export { moTimeStampFormat };
