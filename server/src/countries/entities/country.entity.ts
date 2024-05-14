import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Country {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}
