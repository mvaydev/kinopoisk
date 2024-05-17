import { Film } from 'src/film/entities/film.entity'
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Genre {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @ManyToMany(() => Film, (film) => film.genres)
    films: Film[]
}
