import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './google.strategy'
import { UsersModule } from 'src/users/users.module'

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
