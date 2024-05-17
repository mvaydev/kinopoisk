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

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto)
    }

    @Get()
    async findAll() {
        return await this.categoriesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.categoriesService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, updateCategoryDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.categoriesService.remove(id)
    }
}
