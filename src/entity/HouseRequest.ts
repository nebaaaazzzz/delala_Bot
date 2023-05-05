import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class HouseRequest {
  @PrimaryColumn()
  id!: number;

  @Column()
  subcity!: string;

  @Column()
  propertyType!: string;

  @Column({ type: "int" })
  numberOfBedrooms!: number;

  @Column({
    enum: ["RENT", "BUY"],
  })
  houseRequestType!: string;

  @ManyToOne(() => User, (user) => user.houseRequests)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date; // Creation date

  @UpdateDateColumn()
  updatedAt!: Date;
}
