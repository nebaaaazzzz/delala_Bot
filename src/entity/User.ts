import {
  BaseEntity,
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
export class User extends BaseEntity {
  @PrimaryColumn("varchar")
  telegramId: string;

  @Column({
    type: "varchar",
    default: "",
  })
  telegramFirstName: string;

  @Column({
    type: "varchar",
    default: "",
  })
  telegramLastName: string;

  @Column("varchar")
  fullName: string;

  @Column({
    type: "varchar",
    // enum: ["EN", "AM"],
  })
  language: string;

  @Column("varchar")
  phoneNumber: string;

  @Column({
    type: "varchar",
    default: "",
  })
  userName: string;

  @OneToMany(() => House, (house) => house.user)
  houses: House[];

  @OneToMany(() => HouseRequest, (houseRequest) => houseRequest.user)
  houseRequests: HouseRequest[];

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date;
}
