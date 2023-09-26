import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("editora", { schema: "public" })
export class Editora {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "endereco" })
  endereco: string;

  @Column("character varying", { name: "num_telefone" })
  numTelefone: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "site", nullable: true })
  site: string | null;

  @Column("integer", { name: "ano_fundacao" })
  anoFundacao: number;
}
