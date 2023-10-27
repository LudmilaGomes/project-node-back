import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bibliotecario } from "./Bibliotecario";
import { Exemplar } from "./Exemplar";
import { Usuario } from "./Usuario";
import { Estado_bool } from "./EstadoBool";
import { Multa } from "./Multa";

@Entity("emprestimo", { schema: "public" })
export class Emprestimo {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "data_realizacao" })
  data_realizacao: number;

  @Column("integer", { name: "data_devolucao" })
  data_devolucao: number;

  @ManyToOne(
    () => Bibliotecario,
    (bibliotecario) => bibliotecario.emprestimos,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "id_bibliotecario", referencedColumnName: "id" }])
  id_bibliotecario: Bibliotecario;

  @ManyToOne(() => Exemplar, (exemplar) => exemplar.emprestimos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_exemplar", referencedColumnName: "id_livro" }])
  id_exemplar: Exemplar;

  @ManyToOne(() => Usuario, (usuario) => usuario.emprestimos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  id_usuario: Usuario;

  @ManyToOne(() => Estado_bool, (estado_bool) => estado_bool.emprestimos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tem_multa", referencedColumnName: "id" }])
  tem_multa: Estado_bool;

  @OneToMany(() => Multa, (multa) => multa.id_emprestimo)
  multas: Multa[];
}
