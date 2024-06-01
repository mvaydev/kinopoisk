import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'
import { Roles } from './role.decorator'
import { RoleType } from './roles'
import { AddRoleDto } from './role.dto'
import { UsersService } from 'src/users/users.service'

@Roles([RoleType.ADMIN])
@Controller('role')
export class RolesController {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly usersService: UsersService,
    ) {}

    @Post('/add')
    async addRoleToUser(@Body() addRoleDto: AddRoleDto) {
        const { userId, roleId } = addRoleDto

        const user = await this.usersService.findOne(userId)
        const role = await this.roleRepository.findOneBy({ id: roleId })
        if (!user) throw new BadRequestException('User not found')
        if (!role) throw new BadRequestException('Role not found')

        try {
            role.users.push(user)
            return await this.roleRepository.save(role)
        } catch {
            throw new BadRequestException('User already have this role')
        }
    }

    @Get()
    async findAll() {
        return await this.roleRepository.find()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.roleRepository.findOneByOrFail({ id })
        } catch {
            throw new NotFoundException()
        }
    }

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
