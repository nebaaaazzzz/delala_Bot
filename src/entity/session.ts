import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryColumn()
  id!: number;

  @Column({
    unique: true,
  })
  key!: string;

  @Column({
    type: "longtext",
  })
  value!: string;
}
