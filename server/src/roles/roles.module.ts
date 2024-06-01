import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
    imports: [TypeOrmModule.forFeature([Role]), UsersModule],
    controllers: [RolesController],
})
export class RolesModule {}
