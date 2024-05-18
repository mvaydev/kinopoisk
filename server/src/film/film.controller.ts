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

@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

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

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFilmDto: UpdateFilmDto,
    ) {
        return await this.filmService.update(id, updateFilmDto)
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.remove(id)
    }
}
