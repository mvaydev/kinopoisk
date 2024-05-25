import { UUID } from 'crypto'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column({ unique: true })
    googleId: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    photoUrl: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date
}
