import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { CreateUserDto } from "src/users/user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    saveUser(user: CreateUserDto) {
        this.usersService.create(user)
    }

    getTokens(userId: string) {
        return {
            accessToken: sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15min' })
        }
    }
}