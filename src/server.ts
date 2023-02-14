import { App } from "./app";
import logger from "./util/logger";

export const start = async () => {
  try {
    const app = new App();
    await app.start();
  } catch (err) {
    logger.error(err);
  }
};

start();
