# [icp-note-take](https://github.com/andrewblais/icp-note-take)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
[![MIT License](https://img.shields.io/badge/License-MIT-firebrick.svg)](./LICENSE)
![Built with](https://img.shields.io/badge/Built%20With-React%20%7C%20Motoko%20%7C%20ICP-forestgreen)
![Status](https://img.shields.io/badge/status-learning--project-darkgoldenrod)

**icp-note-take** is a responsive note-taking application built with **React** on the frontend and **Motoko** on the backend, deployed to the **Internet Computer (ICP)**.

It’s a feature-matching rebuild of my earlier [`note-take`](https://github.com/andrewblais/note-take) project, which used a **Node.js/Express backend with a PostgreSQL database**.

Completed as an assignment for [Angela Yu's WebDev Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/), taking her basic architecture, expanding and modernizing it with my own style and functionality.

- The main difference is that **icp-note-take** stores all data directly on-chain via ICP canisters — eliminating the SQL layer entirely while maintaining core note-taking functionality.
- This shift showcases how a traditional full-stack app can be re-architected for decentralized, serverless deployment without sacrificing responsiveness or usability.

---

## Differences from `note-take`

| Feature / Aspect      | `note-take` (Original)             | `icp-note-take` (This Project)                             |
| --------------------- | ---------------------------------- | ---------------------------------------------------------- |
| **Backend**           | Node.js + Express                  | Motoko (ICP Canister)                                      |
| **Database**          | PostgreSQL (via pgAdmin)           | On-chain storage via stable variables                      |
| **Hosting**           | Local dev / AWS EC2 + S3 planned   | Internet Computer (`dfx deploy`)                           |
| **API Integrations**  | Dad Jokes API + Quotes API         | Dad Jokes API only (Quotes removed due to ICP CORS limits) |
| **Persistence Layer** | Relational DB tables & SQL queries | In-memory data persisted with stable vars                  |
| **Deployment Flow**   | Node server + React build          | Canister backend + React frontend via asset canister       |
| **Goal**              | Bootcamp capstone (AWS target)     | Integrating React with ICP/Motoko/decentralized deployment |

---

## 📚 Table of Contents

- [Screenshots](#-screenshots)
- [Installation](#-installationgetting-started)
- [Project Structure](#-project-structure)
- [Reflections & Lessons](#-reflections--pain-points)
- [Resources](#-resources)
- [Author](#-author)

---

## Screenshots

#### Desktop View (Firefox)

![desktop](readme_assets/desktop.png)

#### Mobile Display

![mobile](readme_assets/mobile.png)

#### Add a Joke

Creates a note containing a random joke pulled via `axios` from `https://icanhazdadjoke.com/api`:

![joke](readme_assets/joke.png)

#### Edit a Note

![joke](readme_assets/edit.png)

#### Save After Editing

![joke](readme_assets/save.png)

#### Delete All Notes

![delete](readme_assets/delete_all.png)

#### Delete A Single Note

![delete](readme_assets/delete_one.png)

#### Sort Four Ways

![sort](readme_assets/sort.png)

---

## Installation/Getting Started

> This project runs on the **Internet Computer** via `dfx`. No SQL database is used.

### Prerequisites

- [Node.js](https://nodejs.org)
- [Internet Computer SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [VS Code](https://code.visualstudio.com)
- [Windows Subsystem for Linux (WSL)](https://ubuntu.com/desktop/wsl)

### WSL Setup Notes (for Windows Users)

Get Ubuntu/WSL working and install:

- Node (via `brew` or nvm)
- DFX SDK
- VS Code WSL extension + Motoko plugin

> WSL setup was non-trivial and required repairing Windows internals and manual linking for Node. Notes are in the full version of this README.

### 1. Project Setup/Install Dependencies

```bash
git clone https://github.com/andrewblais/icp-note-take.git
cd icp-note-take
npm install
```

### 2. Start the Local Replica

```bash
dfx start --background # `dfx stop` to stop
dfx start # Or just use this and `Ctrl + C` to stop
```

### 3. Deploy Canisters Locally

```bash
dfx deploy
```

### 4. Start DFINITY and Vite servers

```bash
npm start
```

Local site runs at: `http://localhost:3000`

---

### Deployment Note: Local Replica vs Mainnet

This project is currently configured **only for local development** using the Internet Computer SDK (`dfx`) and a locally running **replica**.
It is **not** connected to the live Internet Computer mainnet (also called the **IC network** or **production network**), so:

- All canisters you deploy with the included instructions exist only on your machine.
- Data is stored locally and is **not persisted on-chain** beyond your local environment.
- No ICP tokens are required or spent.

If you want to deploy this app to the **Internet Computer mainnet**, you will need to:

1. **Get a DFINITY Identity**
   Create or log into an Internet Identity (or other supported identity) that can deploy to mainnet.
    - Docs: [Internet Identity Overview](https://internetcomputer.org/docs/current/references/ii-spec/)

2. **Acquire ICP Cycles**
   Obtain cycles to pay for mainnet canister deployment and hosting.
    - Docs: [Cycles and Canister Costs](https://internetcomputer.org/docs/current/developer-docs/production/cycles/)

3. **Update `dfx.json` for Mainnet**
   Configure your canister settings with `network` set to `"ic"` instead of `"local"`.

4. **Deploy to Mainnet**
   Use the following command:

    ```bash
    dfx deploy --network ic
    ```

5. **Handle Live CORS / API Access**
   Some APIs (like `icanhazdadjoke`) may require proxying or CORS workarounds when running on the live IC network.

**Helpful Resources**

- [Internet Computer – Deploying to Mainnet](https://internetcomputer.org/docs/tutorials/developer-liftoff/level-1/1.5-deploying-canisters)
- [Cycles Wallet Management](https://internetcomputer.org/docs/building-apps/canister-management/cycles-wallet)
- [Motoko Language Reference](https://internetcomputer.org/docs/motoko/language-manual)

---

## Project Structure

```
icp-note-take
├── .env
├── .gitignore
├── LICENSE
├── package.json
├── README.md
├── readme_assets/
├── src/
│   ├── icp-note-take-backend/
│   │   └── main.mo
│   └── icp-note-take-frontend/
│       ├── index.html
│       ├── public/
│       │   ├── pencil_120.png
│       │   └── pencil_32.ico
│       └── src/
│           ├── App.css
│           ├── App.jsx
│           ├── components/
│           │   ├── AllNotes.jsx
│           │   ├── DeleteAllButton.jsx
│           │   ├── Footer.jsx
│           │   ├── formatDate.js
│           │   ├── Header.jsx
│           │   ├── NewNote.jsx
│           │   ├── OneNote.jsx
│           │   ├── RadioSortButton.jsx
│           │   └── RadioSortButtons.jsx
│           └── main.jsx
└── vite.config.js
```

---

## Reflections & Pain Points

- Motoko’s type system is stricter than JavaScript, but that leads to fewer runtime surprises.
- Replacing PostgreSQL with stable variables changes how you think about persistence and data modeling.
- ICP canister deployment has a very different dev cycle from a traditional Node + DB stack.
- CORS restrictions on ICP mean some APIs are inaccessible without an intermediary — hence [quote](https://github.com/andrewblais/note-take#-add-a-quote) removal.
- The Internet Computer offers built-in asset hosting, so no need for a separate S3 bucket.
- Lots of heavy lifting getting this project to work. Learning Motoko on the fly wasn't easy.
- Angela's course is a bit out of date, but still very useful and educational. Much translation/updating/refactoring of her base code, both frontend and backend was required.

---

## Resources

- [Internet Computer Docs](https://internetcomputer.org/docs/home)
- [Motoko Base Library](https://internetcomputer.org/docs/motoko/base/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [icanhazdadjoke API](https://icanhazdadjoke.com/api)
- [ChatGPT](https://openai.com/index/chatgpt/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [Stack Overflow](https://stackoverflow.com/)

---

_If you see a broken or unclear chunk of code, please open an issue or pull request, or just head for the hills._

---

### Author

_Andrew Blais, Boston, Massachusetts_

Student of Full-Stack Web Development, Machine Learning, Software Engineering and AI Safety & Alignment

Boston, Massachusetts

[GitHub](https://github.com/andrewblais) | [Portfolio](https://andrewblais.dev)
