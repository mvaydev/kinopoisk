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
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'

@Controller('persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.personsService.create(createPersonDto)
    }

    @Get()
    async findAll() {
        return await this.personsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePersonDto: UpdatePersonDto,
    ) {
        return this.personsService.update(id, updatePersonDto)
    }

    @Patch(':id/country')
    updateCountry(
        @Param('id', ParseIntPipe) id: number,
        @Body('countryId') countryId: string,
    ) {
        return this.personsService.updateCountry(id, countryId)
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.personsService.remove(id)
    }
}
