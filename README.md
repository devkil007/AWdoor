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
`anyware-door` Firebase project. The landing page reads the Firebase web app
configuration so authenticated matching flows can be added on top of this
foundation.
