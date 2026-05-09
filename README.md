# Umingle

Umingle is an early-stage video-matching app backed by Firebase project
`anyware-door`.

## Stack

- Vite
- React
- TypeScript
- Firebase Auth, Firestore, Storage

## Getting started

Install dependencies:

```bash
npm install
```

Copy the Firebase environment template and add the web app credentials from the
Firebase Console for `anyware-door`:

```bash
cp .env.example .env.local
```

Run the app locally and expose it to your browser:

```bash
npm run dev -- --host 0.0.0.0
```

## Firebase

The repository is configured with `.firebaserc` and `firebase.json` for the
`anyware-door` Firebase project. Firebase Hosting deploys the Vite `dist`
directory and rewrites routes to `index.html`. Firestore uses `firestore.rules`
and `firestore.indexes.json`.

Deploy Hosting and Firestore rules/indexes:

```bash
npm run deploy
```

If this is your first Firebase CLI deploy on the machine, run `npx firebase login`
once before deploying.
