import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { Roles } from 'src/roles/role.decorator'
import { RoleType } from 'src/roles/roles'
import { Public } from 'src/auth/strategies/jwt.strategy'

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Roles([RoleType.ADMIN])
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto)
    }

    @Public()
    @Get()
    async findAll() {
        return await this.categoriesService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.categoriesService.findOne(id)
    }

    @Roles([RoleType.ADMIN])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, updateCategoryDto)
    }

    @Roles([RoleType.ADMIN])
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.categoriesService.remove(id)
    }
}
