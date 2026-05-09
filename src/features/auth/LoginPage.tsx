import { FormEvent, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirebaseAuth,
  googleAuthProvider,
  isFirebaseConfigured,
} from "../../lib/firebase";

type AuthMode = "sign-in" | "create-account";

export function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useMemo(() => {
    if (!isFirebaseConfigured) {
      return null;
    }

    return getFirebaseAuth();
  }, []);

  const isCreateMode = authMode === "create-account";
  const actionLabel = isCreateMode ? "Create account" : "Sign in";

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);

    if (!auth) {
      setError("Add your anyware-door Firebase web API key to .env.local before signing in.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isCreateMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        setStatus("Account created. Welcome to Door.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus("Signed in. Door matching is ready for the next step.");
      }
    } catch (caughtError) {
      setError(getAuthErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setStatus(null);
    setError(null);

    if (!auth) {
      setError("Add your anyware-door Firebase web API key to .env.local before signing in.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signInWithPopup(auth, googleAuthProvider);
      setStatus("Signed in with Google. Door matching is ready for the next step.");
    } catch (caughtError) {
      setError(getAuthErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="hero-panel" aria-labelledby="door-title">
        <div className="brand-mark" aria-hidden="true">
          door
        </div>
        <p className="eyebrow">Video matching for people at the same moment</p>
        <h1 id="door-title">Open a door to the right conversation.</h1>
        <p className="hero-copy">
          Door starts with a lightweight Firebase foundation: authenticated users today,
          real-time video matching, profiles, and room state next.
        </p>
        <ul className="feature-list" aria-label="Planned Door matching features">
          <li>Verified account access through Firebase Auth</li>
          <li>Match queue and availability state ready for Firestore</li>
          <li>Video room handoff prepared for the next integration</li>
        </ul>
      </section>

      <section className="auth-card" aria-label="Door login form">
        <div>
          <p className="eyebrow">Start matching</p>
          <h2>{actionLabel} to Door</h2>
          <p className="auth-subtitle">
            Use email and password or continue with Google through the anyware-door
            Firebase project.
          </p>
        </div>

        {!isFirebaseConfigured ? (
          <div className="setup-callout" role="status">
            <strong>Firebase setup needed</strong>
            <span>
              Copy <code>.env.example</code> to <code>.env.local</code> and add the
              anyware-door web app credentials from Firebase Console.
            </span>
          </div>
        ) : null}

        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <label>
            Email
            <input
              autoComplete="email"
              disabled={isSubmitting}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete={isCreateMode ? "new-password" : "current-password"}
              disabled={isSubmitting}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              required
              type="password"
              value={password}
            />
          </label>
          <button className="primary-action" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Working..." : actionLabel}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button
          className="secondary-action"
          disabled={isSubmitting}
          onClick={handleGoogleSignIn}
          type="button"
        >
          Continue with Google
        </button>

        <button
          className="mode-toggle"
          disabled={isSubmitting}
          onClick={() => setAuthMode(isCreateMode ? "sign-in" : "create-account")}
          type="button"
        >
          {isCreateMode
            ? "Already have an account? Sign in"
            : "New to Door? Create an account"}
        </button>

        {status ? <p className="status-message">{status}</p> : null}
        {error ? <p className="error-message">{error}</p> : null}
      </section>
    </main>
  );
}

function getAuthErrorMessage(caughtError: unknown) {
  if (caughtError instanceof Error) {
    return caughtError.message;
  }

  return "Something went wrong while contacting Firebase Auth.";
}
