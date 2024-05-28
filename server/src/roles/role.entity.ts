import { User } from 'src/users/user.entity'
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Role {
    @PrimaryColumn()
    id: string

    @ManyToMany(() => User, (user) => user.roles)
    users: User[]
}
