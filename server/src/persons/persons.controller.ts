import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common'
import { PersonsService } from './persons.service'
import { CreatePersonDto, UpdatePersonDto } from './person.dto'
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { Public } from 'src/auth/strategies/jwt.strategy'

@Controller('person')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}

    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.personsService.create(createPersonDto)
    }

    @Public()
    @Get()
    async findAll() {
        return await this.personsService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.findOne(id)
    }

    @Roles([RoleType.ADMIN])
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePersonDto: UpdatePersonDto,
    ) {
        return await this.personsService.update(id, updatePersonDto)
    }

    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.remove(id)
    }
}
