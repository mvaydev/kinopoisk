import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Person } from './entities/person.entity'
import { Repository } from 'typeorm'
import { Country } from 'src/countries/entities/country.entity'

@Injectable()
export class PersonsService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,

        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        const candidate = await this.personRepository.findOneBy({
            name: createPersonDto.name,
        })
        if (candidate) {
            throw new BadRequestException({
                message: 'Person with such ID already exists',
            })
        }

        const country = await this.countryRepository.findOneBy({
            id: createPersonDto.countryId,
        })
        if (!country) {
            throw new BadRequestException({
                message: 'Invalid country ID',
            })
        }


        const person = new Person()
        person.name = createPersonDto.name
        person.birth = createPersonDto.birth
        person.photoUrl = createPersonDto.photoUrl
        person.country = country

        this.personRepository.save(person)

        return person
    }

    async findAll() {
        return await this.personRepository.find()
    }

    async findOne(id: number) {
        const person = await this.personRepository.findOne({
            where: { id },
            relations: {
                country: true,
            },
        })
        if (!person) throw new NotFoundException()

        return person
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.personRepository.findOneBy({ id })
        if (!person) throw new NotFoundException()

        person.name =
            updatePersonDto.name ?
            updatePersonDto.name :
            person.name

        person.birth =
            updatePersonDto.birth ?
            new Date(updatePersonDto.birth) :
            person.birth

        person.photoUrl =
            updatePersonDto.photoUrl ?
            updatePersonDto.photoUrl :
            person.photoUrl

        return await this.personRepository.save(person)
    }

    async updateCountry(id: number, countryId: string) {
        const person = await this.personRepository.findOneBy({ id })
        if (!person) throw new NotFoundException()

        const country = await this.countryRepository.findOneBy({
            id: countryId,
        })
        if (!country) {
            throw new BadRequestException({
                message: 'Invalid country ID',
            })
        }

        person.country = country

        return await this.personRepository.save(person)
    }

    async remove(id: number) {
        const person = await this.personRepository.findOneBy({ id })
        if (!person) throw new NotFoundException()

        this.personRepository.delete(id)

        return person
    }
}
