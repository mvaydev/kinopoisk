import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const candidate = await this.categoryRepository.findOneBy({
            id: createCategoryDto.id,
        })
        if (candidate)
            throw new BadRequestException({
                message: 'Category with such ID already exists',
            })

        const category = new Category()
        category.id = createCategoryDto.id
        category.name = createCategoryDto.name

        this.categoryRepository.save(category)

        return category
    }

    async findAll() {
        return await this.categoryRepository.find()
    }

    async findOne(id: string) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['films'],
        })
        if (!category) throw new NotFoundException()

        return category
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category) throw new NotFoundException()

        category.name = updateCategoryDto.name

        return await this.categoryRepository.save(category)
    }

    async remove(id: string) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category) throw new NotFoundException()

        this.categoryRepository.delete(id)

        return category
    }
}
