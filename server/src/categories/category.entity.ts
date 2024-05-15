import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Category {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}
