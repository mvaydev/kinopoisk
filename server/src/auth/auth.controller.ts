import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { OAuthGuard } from './guards/oauth.guard'
import { sign } from 'jsonwebtoken'

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Get('login')
    @UseGuards(OAuthGuard)
    login() {}

    @Get('callback')
    @UseGuards(OAuthGuard)
    callback(@Req() { user }) {
        this.usersService.findOrCreate({
            id: user.id,
            name: user.displayName,
            email: user.emails[0].value,
            photoUrl: user.photos[0].value,
        })

        return {
            accessToken: sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '15min' }
            )
        }
    }
}
