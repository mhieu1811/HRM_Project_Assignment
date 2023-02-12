import { App } from "./app";

export const start = async () => {
  try {
    const app = new App();
    await app.start();
  } catch (err) {
    console.error(err);
  }
};

start();
