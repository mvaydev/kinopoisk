import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { OAuthGuard } from './oauth.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Get('login')
    @UseGuards(OAuthGuard)
    login() {}

    @Get('callback')
    @UseGuards(OAuthGuard)
    async callback(@Req() { user }) {
        return await this.usersService.findOrCreate({
            id: user.id,
            name: user.displayName,
            email: user.emails[0].value,
            photoUrl: user.photos[0].value,
        })
    }
}
