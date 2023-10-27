import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emprestimo } from "./Emprestimo";

@Entity("bibliotecario", { schema: "public" })
export class Bibliotecario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "cpf" })
  cpf: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "senha" })
  senha: string;

  @Column("date", { name: "data_nasc" })
  data_nasc: string;

  @Column("character varying", { name: "genero" })
  genero: string;

  @Column("character varying", { name: "endereco" })
  endereco: string;

  @Column("character varying", { name: "telefone" })
  telefone: string;

  @Column("date", { name: "data_admissao" })
  data_admissao: string;

  @Column("character varying", { name: "formacao_academica" })
  formacao_academica: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.id_bibliotecario)
  emprestimos: Emprestimo[];
}
