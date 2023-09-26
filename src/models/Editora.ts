import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from "./Livro";

@Entity("editora", { schema: "public" })
export class Editora {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "endereco" })
  endereco: string;

  @Column("character varying", { name: "num_telefone" })
  num_telefone: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "site", nullable: true })
  site: string | null;

  @Column("integer", { name: "ano_fundacao" })
  ano_fundacao: number;

  @OneToMany(() => Livro, (livro) => livro.cod_editora)
  livros: Livro[];
}
