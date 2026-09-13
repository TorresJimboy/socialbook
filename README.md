# Socialbook

A static social network demo built with React and Create React App. No backend, database, API keys, or environment variables are required.

Log in with any email or username and any password (or none), or choose **Continue as Guest**. Create Account immediately enters the demo with your chosen display name. Passwords are never checked or stored, and email confirmation is not needed.

Profiles and uploaded profile images are stored per demo identity in localStorage. The existing sample feed, posts, reactions, comments, and uploaded feed media use browser storage (localStorage and IndexedDB) and are shared by demo identities in that browser. Messenger uses sample conversations and simulated replies. Nothing is sent to other people or synchronized between devices. Clear this site's browser storage to reset the demo. When localStorage is unavailable, profile changes last only for the current visit.

```sh
npm ci
npm start
npm run build
```

The static build is in `build/`. Relative asset paths work at a site's root URL or a subpath. Hash routes support direct links and refreshes on static hosting. Some sample images and fonts still use external URLs.

For Netlify, import this project's repository as a site. The checked-in `netlify.toml` selects Node 22, sets relative asset URLs, runs `npm run build`, and publishes `build`. Leave the base directory empty when this project is the repository root; if importing a repository containing multiple projects, set the base directory to `socialbook`. No database keys or manual environment variable setup is required. For a manual deploy, build first and upload the `build` folder.

App links use hashes, such as `/#/home` and `/#/profile`; no server rewrite is needed. The existing `npm run deploy` command also remains available for GitHub Pages.
