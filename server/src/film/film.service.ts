import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { CreateFilmDto } from './dto/create-film.dto'
import { UpdateFilmDto } from './dto/update-film.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Film } from './entities/film.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(Film)
        private readonly filmRepository: Repository<Film>,
    ) {}

    private readonly logger: Logger = new Logger(FilmService.name)

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
        } catch (e) {
            this.logger.error(e)

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

    async update(id: number, updateFilmDto: UpdateFilmDto) {
        const film = await this.filmRepository.findOneBy({ id })
        if (!film) throw new NotFoundException()

        await this.filmRepository.update(id, updateFilmDto.getExcludedCopy())
        film.addRelatedEntities(updateFilmDto.countryIds, 'countries')
        film.addRelatedEntities(updateFilmDto.genreIds, 'genres')
        film.addRelatedEntities(updateFilmDto.personIds, 'persons')

        try {
            return await this.filmRepository.save(film)
        } catch (e) {
            this.logger.error(e)

            throw new BadRequestException({
                message: 'Wrong ids',
            })
        }
    }

    async remove(id: number) {
        const film = await this.filmRepository.findOneBy({ id })
        if (!film) throw new NotFoundException()

        this.filmRepository.delete(id)

        return film
    }
}
