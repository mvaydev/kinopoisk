import { Country } from 'src/countries/country.entity'
import { Film } from 'src/film/entities/film.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Person {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    photoUrl: string

    @Column('timestamp with time zone')
    birth: Date

    @Column({ select: false })
    countryId: string

    @ManyToOne(() => Country, (country) => country.persons)
    @JoinColumn()
    country: Country

    @ManyToMany(() => Film, (film) => film.persons)
    films: Film[]
}
