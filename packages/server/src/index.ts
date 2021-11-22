import { createServer } from "http";
import app from "./app";
import { config } from "./config";
import connectDatabase from "./database";

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log("connecting to database...");
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Could not connect to database", { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running at http://localhost:${config.PORT}`);
  });
})();
