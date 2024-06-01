import { UUID } from 'crypto'
import { Role } from 'src/roles/role.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
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

    @ManyToMany(() => Role, (role: Role) => role.users)
    @JoinTable()
    roles: Role[]
}
