const appConfig = {
  appName: "PiGenesis API",
  environment: process.env.NODE_ENV ?? "development",
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  apiVersion: "v1",
} as const;

export default appConfig;