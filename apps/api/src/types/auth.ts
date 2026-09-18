export type AuthProvider =
  | "local"
  | "google"
  | "microsoft"
  | "oidc";

export type AuthenticatedIdentity = {
  provider: AuthProvider;
  providerUserId: string;
  email: string;
  displayName: string;
};

export type AuthenticatedUser = {
  userId: string;
  email: string;
  displayName: string;
};

export type AuthenticationResult = {
  identity: AuthenticatedIdentity;
  user: AuthenticatedUser;
};