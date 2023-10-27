import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Emprestimo } from "./Emprestimo";
import { Usuario } from "./Usuario";
import { Estado_bool } from "./EstadoBool";

@Entity("multa", { schema: "public" })
export class Multa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "valor_multa" })
  valor_multa: number;

  @Column("date", { name: "data_limite" })
  data_limite: string;

  @Column("date", { name: "data_hoje" })
  data_hoje: string;

  @ManyToOne(() => Emprestimo, (emprestimo) => emprestimo.multas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_emprestimo", referencedColumnName: "id" }])
  id_emprestimo: Emprestimo;

  @ManyToOne(() => Usuario, (usuario) => usuario.multas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  id_usuario: Usuario;

  @ManyToOne(() => Estado_bool, (estado_bool) => estado_bool.multas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "multa_paga", referencedColumnName: "id" }])
  multa_paga: Estado_bool;
}
