import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { HouseImage } from "./HouseImage";

@Entity()
export class House {
  @PrimaryColumn()
  id!: number;

  @Column()
  subCity!: string;

  @Column()
  woredaOrSpecificPlace!: string;

  @Column()
  propertyType!: string;

  @Column()
  numberOfBedrooms!: number;

  @Column()
  numberOfBathrooms!: number;

  @Column({
    enum: ["RENT", "SELL"],
  })
  housePostType!: string;

  @Column({
    type: "float",
  })
  price!: number;

  @Column()
  area!: string;

  @Column({
    default: "PENDING",
    enum: ["APPROVED", "REJECTED", "PENDING"],
  })
  status!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.houses)
  user!: User;

  @OneToMany(() => HouseImage, (houseImage) => houseImage.house)
  houseImages!: HouseImage[];

  @CreateDateColumn()
  createdAt!: Date; // Creation date

  @UpdateDateColumn()
  updatedAt!: Date;
}
