import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/sync-extension",
      errorCallbackURL: "/error?type=auth",
    });
  } catch {
    window.location.href = "/error?type=auth";
  }
};

export const signOut = authClient.signOut;
