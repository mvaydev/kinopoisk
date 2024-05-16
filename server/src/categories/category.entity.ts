import { Film } from 'src/film/entities/film.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Category {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Film, (film) => film.category)
    films: Film[]
}
