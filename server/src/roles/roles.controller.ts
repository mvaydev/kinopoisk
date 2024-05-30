import {
    Controller,
    Get,
    NotFoundException,
    Param,
    UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from './role.decorator'
import { RoleType } from './roles'

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    @Roles([RoleType.ADMIN])
    @Get()
    async findAll() {
        return await this.roleRepository.find()
    }

    @Roles([RoleType.ADMIN])
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.roleRepository.findOneByOrFail({ id })
        } catch {
            throw new NotFoundException()
        }
    }

    @Roles([RoleType.ADMIN])
    @Get(':id/users')
    async findRoleUSers(@Param('id') id: string) {
        try {
            return await this.roleRepository.findOneOrFail({
                where: { id },
                relations: ['users'],
            })
        } catch {
            throw new NotFoundException()
        }
    }
}
