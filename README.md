# Door

Door is an early-stage video-matching app backed by Firebase project
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

Run the app locally:

```bash
npm run dev
```

## Firebase

The repository is configured with `.firebaserc` and `firebase.json` for the
`anyware-door` Firebase project. The login page uses Firebase Auth with email /
password and Google sign-in.
