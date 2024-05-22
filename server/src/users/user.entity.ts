import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column({ default: '' })
    photoUrl: string

    @Column({ nullable: true })
    confirmLink: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date
}
