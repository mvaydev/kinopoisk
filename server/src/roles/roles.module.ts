import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
})
export class RolesModule {}
