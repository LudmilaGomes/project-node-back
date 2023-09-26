import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("autor", { schema: "public" })
export class Autor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("date", { name: "data_nasc" })
  dataNasc: string;

  @Column("character varying", { name: "nacionalidade" })
  nacionalidade: string;
}
