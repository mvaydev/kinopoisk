import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common'
import { PersonsService } from './persons.service'
import { CreatePersonDto, UpdatePersonDto } from './person.dto'
import { FindOptionsWhere } from 'typeorm'
import { Person } from './person.entity'

@Controller('persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.personsService.create(createPersonDto)
    }

    @Get()
    async findAll(@Query() searchParams: FindOptionsWhere<Person>) {
        return await this.personsService.findAll(searchParams)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.findOne(id)
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePersonDto: UpdatePersonDto,
    ) {
        return await this.personsService.update(id, updatePersonDto)
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.remove(id)
    }
}
