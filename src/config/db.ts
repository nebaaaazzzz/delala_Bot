import { DataSource } from "typeorm";
import { House } from "../entity/House";
import { User } from "../entity/User";
import { HouseImage } from "../entity/HouseImage";
import { HouseRequest } from "../entity/HouseRequest";
import { Session } from "../entity/session";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "delala",
  synchronize: true,
  logging: true,
  entities: [House, User, HouseImage, HouseRequest, Session],
  subscribers: [],
  migrations: [],
});
