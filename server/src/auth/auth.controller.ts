import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { OAuthGuard } from './guards/oauth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    @UseGuards(OAuthGuard)
    login() {}

    @Get('callback')
    @UseGuards(OAuthGuard)
    callback(@Req() { user }) {
        this.authService.saveUser(user)

        return this.authService.getTokens(user.id)
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    test() {
        return 'Access allowed'
    }
}
