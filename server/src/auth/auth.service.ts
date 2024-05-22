import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/users/user.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async authenticate(reqUser: CreateUserDto) {
        const candidate = await this.usersService.findOne(reqUser.id)
        if (candidate) return candidate

        const user = await this.usersService.create(reqUser)

        return user
    }
}
