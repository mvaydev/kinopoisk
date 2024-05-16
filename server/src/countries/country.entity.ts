import { Person } from 'src/persons/person.entity'
import { Film } from 'src/film/entities/film.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Country {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Person, (person) => person.country)
    persons: Person[]

    @ManyToMany(() => Film, (film) => film.countries)
    films: Film[]
}
