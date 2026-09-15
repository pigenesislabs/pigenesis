import "dotenv/config";

import app from "./app";
import appConfig from "./config/appConfig";

app.listen(appConfig.port, () => {
  console.log(
    `${appConfig.appName} running on http://localhost:${appConfig.port}`
  );
});