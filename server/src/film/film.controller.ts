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
import { CreateFilmDto } from './dto/film.dto'

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

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.remove(id)
    }
}
