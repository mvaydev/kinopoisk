import { Category } from 'src/categories/category.entity'
import { Country } from 'src/countries/country.entity'
import { Genre } from 'src/genres/genre.entity'
import { Person } from 'src/persons/person.entity'
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

    @Column({ select: false })
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

    @ManyToMany(() => Genre, (genre) => genre.films, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    genres: Genre[]

    @ManyToMany(() => Person, (person) => person.films, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    persons: Person[]

    addRelatedEntities(entityIds: (string | number)[], entitiesProp: string) {
        entityIds = Array.from(new Set(entityIds))
        this[entitiesProp] = []

        for (let entityId of entityIds) {
            this[entitiesProp].push({ id: entityId })
        }
    }
}
