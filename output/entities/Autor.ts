import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Livro } from "./Livro";

@Entity("autor", { schema: "public" })
export class Autor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "data_nasc" })
  dataNasc: string;

  @Column("character varying", { name: "nacionalidade" })
  nacionalidade: string;

  // @OneToMany(() => Livro, (livro) => livro.codAutor)
  // livros: Livro[];
}
