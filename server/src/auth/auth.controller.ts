import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    auth() {}

    @Get('callback')
    @UseGuards(AuthGuard('google'))
    async callback(@Req() req) {
        return await this.authService.authenticate(req.user)
    }
}
