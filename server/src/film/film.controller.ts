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
import { FilmService } from './film.service'
import { CreateFilmDto } from './dto/create-film.dto'
import { UpdateFilmDto } from './dto/update-film.dto'

import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { Public } from 'src/auth/strategies/jwt.strategy'

@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.filmService.create(createFilmDto)
    }

    @Public()
    @Get()
    async findAll() {
        return await this.filmService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.filmService.findOne(id)
    }

    @Roles([RoleType.ADMIN])
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFilmDto: UpdateFilmDto,
    ) {
        return await this.filmService.update(id, updateFilmDto)
    }

    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.remove(id)
    }
}
