import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { UsersModule } from 'src/users/users.module'
import { OAuthGuard } from './guards/oauth.guard'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard } from './guards/jwt.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthService } from './auth.service'

@Module({
    imports: [UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        JwtStrategy,
        OAuthGuard,
        JwtAuthGuard,
        AuthService,
    ],
    exports: [JwtAuthGuard],
})
export class AuthModule {}
