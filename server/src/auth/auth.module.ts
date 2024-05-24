import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './google.strategy'
import { UsersModule } from 'src/users/users.module'
import { OAuthGuard } from './oauth.guard'

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [GoogleStrategy, OAuthGuard]
})
export class AuthModule {}
