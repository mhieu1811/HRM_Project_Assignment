import express, { Express } from "express";
import * as env from "dotenv";
import { json } from "body-parser";
import mongoose, { MongooseOptions } from "mongoose";
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
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }
  public initialMiddleware() {
    this.server.set("trust proxy", true);
    this.server.use(json());
  }
}
