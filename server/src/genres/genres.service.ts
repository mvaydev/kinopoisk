import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateGenreDto, UpdateGenreDto } from './genre.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Genre } from './genre.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async create(createGenreDto: CreateGenreDto) {
        const candidate = await this.genreRepository.findOneBy({
            id: createGenreDto.id,
        })
        if (candidate) {
            throw new BadRequestException({
                message: 'Genre with such ID already exists',
            })
        }

        const genre = new Genre()
        genre.id = createGenreDto.id
        genre.name = createGenreDto.name

        this.genreRepository.save(genre)

        return genre
    }

    async findAll() {
        return await this.genreRepository.find()
    }

    async findOne(id: string) {
        const genre = await this.genreRepository.findOneBy({ id })
        if (!genre) throw new NotFoundException()

        return genre
    }

    async update(id: string, updateGenreDto: UpdateGenreDto) {
        const genre = await this.genreRepository.findOneBy({ id })
        if (!genre) throw new NotFoundException()

        genre.name = updateGenreDto.name

        return await this.genreRepository.save(genre)
    }

    async remove(id: string) {
        const genre = await this.genreRepository.findOneBy({ id })
        if (!genre) throw new NotFoundException()

        this.genreRepository.delete(id)

        return genre
    }
}
