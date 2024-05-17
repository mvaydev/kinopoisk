import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateFilmDto, UpdateFilmDto } from './dto/film.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Film } from './entities/film.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(Film)
        private readonly filmRepository: Repository<Film>,
    ) {}

    async create(createFilmDto: CreateFilmDto) {
        const candidate = await this.filmRepository.findOneBy({
            name: createFilmDto.name,
        })

        if (candidate)
            throw new BadRequestException({
                message: 'Film with such name already exists',
            })

        const film = this.filmRepository.create(createFilmDto)
        film.addRelatedEntities(createFilmDto.countryIds, 'countries')
        film.addRelatedEntities(createFilmDto.genreIds, 'genres')
        film.addRelatedEntities(createFilmDto.personIds, 'persons')

        try {
            return await this.filmRepository.save(film)
        } catch {
            throw new BadRequestException({
                message: 'Wrong ids',
            })
        }
    }

    async findAll() {
        return await this.filmRepository.find({ loadEagerRelations: false })
    }

    async findOne(id: number) {
        try {
            return await this.filmRepository.findOneByOrFail({ id })
        } catch (e) {
            throw new NotFoundException()
        }
    }

    async remove(id: number) {
        const film = await this.filmRepository.findOneBy({ id })
        if (!film) throw new NotFoundException()

        this.filmRepository.delete(id)

        return film
    }
}
