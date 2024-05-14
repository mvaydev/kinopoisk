import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CreateCountryDto } from './dto/create-country.dto'
import { UpdateCountryDto } from './dto/update-country.dto'

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Post()
    async create(@Body() createCountryDto: CreateCountryDto) {
        return await this.countriesService.create(createCountryDto)
    }

    @Get()
    async findAll() {
        return await this.countriesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.countriesService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCountryDto: UpdateCountryDto,
    ) {
        return this.countriesService.update(id, updateCountryDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.countriesService.remove(id)
    }
}
