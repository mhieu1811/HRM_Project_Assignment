import express, { Express } from "express";
import * as env from "dotenv";
import { json } from "body-parser";
env.config();

export class App {
  private readonly serviceContract: any;
  private readonly port: number;
  public server: Express;

  constructor() {
    this.server = express();
    this.port = process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  public async start() {
    this.initialMiddleware();
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }
  public initialRoute() {}
  public initialMiddleware() {
    this.server.set("trust proxy", true);
    this.server.use(json());
  }
}
