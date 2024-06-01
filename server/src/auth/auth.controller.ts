import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { OAuthGuard } from './guards/oauth.guard'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { Public } from './strategies/jwt.strategy'

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(OAuthGuard)
    @Get('login')
    login() {}

    @UseGuards(OAuthGuard)
    @Get('callback')
    async callback(@Req() { user: profile }) {
        const user = await this.usersService.findOrCreate({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0].value,
        })

        return this.authService.getTokens(user)
    }
}
