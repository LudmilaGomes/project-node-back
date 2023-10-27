import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emprestimo } from "./Emprestimo";
import { Multa } from "./Multa";
import { Usuario } from "./Usuario";

@Entity("estado_bool", { schema: "public" })
export class Estado_bool {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.tem_multa)
  emprestimos: Emprestimo[];

  @OneToMany(() => Multa, (multa) => multa.multa_paga)
  multas: Multa[];

  @OneToMany(() => Usuario, (usuario) => usuario.eh_estudante)
  usuarios: Usuario[];

  @OneToMany(() => Usuario, (usuario) => usuario.tem_multa)
  usuarios2: Usuario[];
}
