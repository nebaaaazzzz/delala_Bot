import { DataSource } from "typeorm";
import { House } from "../entity/House";
import { User } from "../entity/User";
import { HouseImage } from "../entity/HouseImage";
import { HouseRequest } from "../entity/HouseRequest";
import { Session } from "../entity/session";

const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: "mysql",
  // host: "localhost",
  // port: 3306,
  // username: "root",
  // password: "",
  // database: "delala",
  synchronize: true,
  logging: false,
  entities: [House, User, HouseImage, HouseRequest, Session],
  subscribers: [],
  migrations: [],
});
export default AppDataSource;
