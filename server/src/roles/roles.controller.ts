import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'

@Controller('role')
export class RolesController {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

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
