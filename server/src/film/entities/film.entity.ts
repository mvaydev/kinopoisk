import { Category } from 'src/categories/category.entity'
import { Country } from 'src/countries/country.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    originalName: string

    @Column()
    description: string

    @Column()
    creationYear: number

    @Column()
    previewUrl: string

    @Column()
    ageLimit: number

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

    @Column()
    categoryId: string

    @ManyToOne(() => Category, (category) => category.films, { eager: true })
    @JoinColumn()
    category: Category

    @ManyToMany(() => Country, (country) => country.films, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    countries: Country[]

    addCountries(countryIds: string[]) {
        this.countries = []

        for (let countryId of countryIds) {
            const candidate = this.countries.find(
                (country) => country.id === countryId,
            )
            if (candidate) continue

            this.countries.push({ id: countryId } as Country)
        }
    }
}
