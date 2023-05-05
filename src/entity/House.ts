import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { HouseImage } from "./HouseImage";

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  subCity: string;

  @Column("varchar")
  woredaOrSpecificPlace: string;

  @Column("varchar")
  propertyType: string;

  @Column("int")
  numberOfBedrooms: number;

  @Column("int")
  numberOfBathrooms: number;

  @Column({
    type: "varchar",
    // enum: ["RENT", "SELL"],
  })
  housePostType: string;

  @Column({
    type: "float",
  })
  price: number;

  @Column("varchar")
  area: string;

  @Column({
    type: "varchar",
    default: "PENDING",
    // enum: ["APPROVED", "REJECTED", "PENDING"],
  })
  status: string;

  @ManyToOne(() => User, (user) => user.houses)
  user: User;

  @OneToMany(() => HouseImage, (houseImage) => houseImage.house)
  houseImages: HouseImage[];

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date;
}
