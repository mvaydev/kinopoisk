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
import { CreateCountryDto, UpdateCountryDto } from './country.dto'
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { Public } from 'src/auth/strategies/jwt.strategy'

@Controller('country')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createCountryDto: CreateCountryDto) {
        return await this.countriesService.create(createCountryDto)
    }

    @Public()
    @Get()
    async findAll() {
        return await this.countriesService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.countriesService.findOne(id)
    }

    @Roles([RoleType.ADMIN])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCountryDto: UpdateCountryDto,
    ) {
        return this.countriesService.update(id, updateCountryDto)
    }

    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.countriesService.remove(id)
    }
}
