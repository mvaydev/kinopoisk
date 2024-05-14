import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Genre {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}
