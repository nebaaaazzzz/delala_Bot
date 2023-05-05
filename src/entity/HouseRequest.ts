import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class HouseRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  subCity: string;

  @Column("varchar")
  propertyType: string;

  @Column({ type: "int" })
  numberOfBedrooms: number;

  @Column({
    type: "varchar",
    // enum: ["RENT", "BUY"],
  })
  houseRequestType: string;

  @ManyToOne(() => User, (user) => user.houseRequests)
  user: User;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date;
}
