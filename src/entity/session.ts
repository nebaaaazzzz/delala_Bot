import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
    type: "varchar",
  })
  key: string;

  @Column({
    type: "longtext",
  })
  value: string;
}
