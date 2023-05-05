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
import { House } from "./House";

@Entity()
export class HouseImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  image: string;

  @ManyToOne(() => House, (house) => house.houseImages)
  house: House;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date;
  // houseImages
}
