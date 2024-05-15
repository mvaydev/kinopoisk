import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { GenresService } from './genres.service'
import { CreateGenreDto, UpdateGenreDto } from './genre.dto'

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Post()
    async create(@Body() createGenreDto: CreateGenreDto) {
        return await this.genresService.create(createGenreDto)
    }

    @Get()
    async findAll() {
        return await this.genresService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.genresService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
        return this.genresService.update(id, updateGenreDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.genresService.remove(id)
    }
}
