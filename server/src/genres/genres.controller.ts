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
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { Public } from 'src/auth/strategies/jwt.strategy'

@Controller('genre')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createGenreDto: CreateGenreDto) {
        return await this.genresService.create(createGenreDto)
    }

    @Public()
    @Get()
    async findAll() {
        return await this.genresService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.genresService.findOne(id)
    }

    @Roles([RoleType.ADMIN])
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
        return this.genresService.update(id, updateGenreDto)
    }

    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.genresService.remove(id)
    }
}
