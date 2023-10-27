import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Emprestimo } from "./Emprestimo";
import { Multa } from "./Multa";
import { Estado_bool } from "./EstadoBool";

@Entity("usuario", { schema: "public" })
export class Usuario {
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

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.id_usuario)
  emprestimos: Emprestimo[];

  @OneToMany(() => Multa, (multa) => multa.id_usuario)
  multas: Multa[];

  @ManyToOne(() => Estado_bool, (estado_bool) => estado_bool.usuarios, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "eh_estudante", referencedColumnName: "id" }])
  eh_estudante: Estado_bool;

  @ManyToOne(() => Estado_bool, (estado_bool) => estado_bool.usuarios2, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tem_multa", referencedColumnName: "id" }])
  tem_multa: Estado_bool;
}
