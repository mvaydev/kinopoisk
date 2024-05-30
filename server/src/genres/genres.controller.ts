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
import { GenresService } from './genres.service'
import { CreateGenreDto, UpdateGenreDto } from './genre.dto'
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('genre')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
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

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
        return this.genresService.update(id, updateGenreDto)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.genresService.remove(id)
    }
}
