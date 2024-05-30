import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { FilmService } from './film.service'
import { CreateFilmDto } from './dto/create-film.dto'
import { UpdateFilmDto } from './dto/update-film.dto'

import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.filmService.create(createFilmDto)
    }

    @Get()
    async findAll() {
        return await this.filmService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.filmService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFilmDto: UpdateFilmDto,
    ) {
        return await this.filmService.update(id, updateFilmDto)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.remove(id)
    }
}
