import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CreateCountryDto, UpdateCountryDto } from './country.dto'
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('country')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
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

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCountryDto: UpdateCountryDto,
    ) {
        return this.countriesService.update(id, updateCountryDto)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.countriesService.remove(id)
    }
}
