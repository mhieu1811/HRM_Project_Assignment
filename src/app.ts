import "reflect-metadata";
import express, { Express } from "express";
import * as env from "dotenv";
import bodyParser from "body-parser";
import { json } from "body-parser";
import mongoose, { MongooseOptions } from "mongoose";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./util/inversify_config/inversify.config";
import "./controllers/team.controller";
import "./controllers/employee.controller";
import "./controllers/user.controller";
env.config();

export class App {
  private readonly port: number;
  private readonly uri: string;
  public server: Express;

  constructor() {
    this.server = express();
    this.port = process.env.PORT ? Number(process.env.PORT) : 3000;
    this.uri = process.env.MONGO_URI ? process.env.MONGO_URI : "";
  }

  public connection() {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(this.uri, {
        useNewUrlParser: true,
      } as MongooseOptions)
      .then(() => {
        console.log("Connected to MongooDB");
      })
      .catch((err) => {
        console.log("Failed to connect to MongooDB, ", err.message);
      });
  }

  public async start() {
    this.connection();
    this.initialMiddleware();
    const appConfigured = new InversifyExpressServer(
      container,
      null,
      { rootPath: "/api" },
      this.server
    ).build();

    appConfigured.listen(this.port, () =>
      console.log(`Server listening on http://localhost:${this.port}`)
    );
  }
  public initialMiddleware() {
    this.server.set("trust proxy", true);
    this.server.use(json());
    this.server.use(bodyParser.json());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }
}
