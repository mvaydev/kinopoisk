import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'
import { CreateRoleDto, UpdateRoleDto } from './role.dto'

@Controller('role')
export class RolesController {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOneBy({
            id: createRoleDto.id,
        })
        if (candidate)
            throw new BadRequestException({
                message: 'Role with such ID already exists',
            })

        const role = new Role()
        role.id = createRoleDto.id

        this.roleRepository.save(role)

        return role
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

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRoleDto: UpdateRoleDto,
    ) {
        const role = await this.roleRepository.findOneBy({ id })
        if (!role) throw new NotFoundException()

        role.id = updateRoleDto.id

        return role
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const role = await this.roleRepository.findOneBy({ id })
        if (!role) throw new NotFoundException()

        this.roleRepository.delete(id)

        return role
    }
}
