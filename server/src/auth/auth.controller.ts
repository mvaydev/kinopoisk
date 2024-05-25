import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { OAuthGuard } from './guards/oauth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt.guard'
import { UsersService } from 'src/users/users.service'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Get('login')
    @UseGuards(OAuthGuard)
    login() {}

    @Get('callback')
    @UseGuards(OAuthGuard)
    async callback(@Req() { user: profile }) {
        const user = await this.usersService.findOrCreate({
            googleId: profile.id,
            name: profile.username,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0].value
        })

        return this.authService.getTokens(user.id)
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async test(@Req() req: any) {
        return await this.usersService.findOne(req.user.userId)
    }
}
