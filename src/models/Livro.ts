import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Autor } from "./Autor";
import { Editora } from "./Editora";

@Entity("livro", { schema: "public" })
export class Livro {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "descricao" })
  descricao: string;

  @Column("integer", { name: "quantidade" })
  quantidade: number;

  @Column("date", { name: "data_public" })
  data_public: string;

  @Column("character varying", { name: "genero" })
  genero: string;

  @Column("integer", { name: "volume", nullable: true })
  volume: number | null;

  @Column("integer", { name: "edicao" })
  edicao: number;

  @ManyToOne(() => Autor, (autor) => autor.livros, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "cod_autor", referencedColumnName: "id" }])
  cod_autor: Autor;

  @ManyToOne(() => Editora, (editora) => editora.livros, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "cod_editora", referencedColumnName: "id" }])
  cod_editora: Editora;
}
