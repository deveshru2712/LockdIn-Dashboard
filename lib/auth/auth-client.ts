import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/sync-extension",
    newUserCallbackURL: "/sync-extension",
  });
};

export const signOut = authClient.signOut;
