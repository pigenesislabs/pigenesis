import type { AuthProvider } from "../types/auth";

const authConfig = {
  defaultProvider: "local" as AuthProvider,
  enabledProviders: ["local"] as AuthProvider[],
} as const;

export default authConfig;