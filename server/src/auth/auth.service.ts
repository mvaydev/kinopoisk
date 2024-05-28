import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { User } from 'src/users/user.entity'

@Injectable()
export class AuthService {
    getTokens(user: User) {
        const payload = {
            id: user.id,
            roles: user.roles,
        }

        return {
            accessToken: sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d',
            }),
        }
    }
}
