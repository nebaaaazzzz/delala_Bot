import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { House } from "./House";

@Entity()
export class HouseImage {
  @PrimaryColumn()
  id!: number;

  @Column()
  image!: string;

  @ManyToOne(() => House, (house) => house.houseImages)
  house!: House;

  @CreateDateColumn()
  createdAt!: Date; // Creation date

  @UpdateDateColumn()
  updatedAt!: Date;
  // houseImages
}
