import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Emprestimo } from "./Emprestimo";
import { Livro } from "./Livro";

@Entity("exemplar", { schema: "public" })
export class Exemplar {
  @Column("integer", { primary: true, name: "id_livro" })
  id_livro: number;

  @Column("integer", { name: "quantidade" })
  quantidade: number;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.id_exemplar)
  emprestimos: Emprestimo[];

  @OneToOne(() => Livro, (livro) => livro.exemplar, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_livro", referencedColumnName: "id" }])
  idLivro2: Livro;
}
