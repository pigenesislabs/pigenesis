import type {
  AuthenticatedIdentity,
  AuthProvider,
} from "../types/auth";

export interface AuthProviderAdapter {
  readonly provider: AuthProvider;

  authenticate(
    credential: string
  ): Promise<AuthenticatedIdentity>;
}