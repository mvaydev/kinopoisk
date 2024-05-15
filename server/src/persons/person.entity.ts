import { Country } from 'src/countries/country.entity'
import {
    Column,
    Entity,
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

    @ManyToOne(() => Country, (country) => country.persons)
    country: Country

}
