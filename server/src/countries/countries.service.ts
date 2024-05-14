import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateCountryDto } from './dto/create-country.dto'
import { UpdateCountryDto } from './dto/update-country.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Country } from './entities/country.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    async create(createCountryDto: CreateCountryDto) {
        const candidate = await this.countryRepository.findOneBy({
            id: createCountryDto.id,
        })
        if (candidate) {
            throw new BadRequestException({
                message: 'Country with such ID already exists',
            })
        }

        const country = new Country()
        country.id = createCountryDto.id
        country.name = createCountryDto.name

        this.countryRepository.save(country)

        return country
    }

    async findAll() {
        return await this.countryRepository.find()
    }

    async findOne(id: string) {
        const country = await this.countryRepository.findOneBy({ id })
        if (!country) throw new NotFoundException()

        return country
    }

    async update(id: string, updateCountryDto: UpdateCountryDto) {
        const country = await this.countryRepository.findOneBy({ id })
        if (!country) throw new NotFoundException()

        country.name = updateCountryDto.name

        return await this.countryRepository.save(country)
    }

    async remove(id: string) {
        const country = await this.countryRepository.findOneBy({ id })
        if (!country) throw new NotFoundException()

        this.countryRepository.delete(id)

        return country
    }
}
