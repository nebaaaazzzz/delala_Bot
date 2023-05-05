import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { House } from "./House";
import { HouseRequest } from "./HouseRequest";

@Entity()
export class User {
  @PrimaryColumn()
  telegramId!: String;

  @Column()
  telegramFirstName!: string;

  @Column()
  telegramLastName!: string;

  @Column()
  fullName!: string;

  @Column({
    enum: ["EN", "AM"],
  })
  language!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  userName!: string;

  @OneToMany(() => House, (house) => house.user)
  houses!: House[];

  @OneToMany(() => HouseRequest, (houseRequest) => houseRequest.user)
  houseRequests!: HouseRequest[];

  @CreateDateColumn()
  createdAt!: Date; // Creation date

  @UpdateDateColumn()
  updatedAt!: Date;
}
