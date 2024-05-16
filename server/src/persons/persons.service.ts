import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreatePersonDto, UpdatePersonDto } from './person.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Person } from './person.entity'
import { Repository } from 'typeorm'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class PersonsService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        const candidate = await this.personRepository.findOneBy({
            name: createPersonDto.name,
        })
        if (candidate)
            throw new BadRequestException({
                message: 'Person with such ID already exists',
            })

        const person = this.personRepository.create(createPersonDto)

        return await this.personRepository.save(person)
    }

    async findAll(searchParams: FindOptionsWhere<Person>) {
        try {
            const person = await this.personRepository.find({
                relations: ['country'],
                where: searchParams,
            })

            return person
        } catch (e) {
            throw new NotFoundException()
        }
    }

    async findOne(id: number) {
        try {
            return await this.personRepository.findOneOrFail({
                where: { id },
                relations: ['country'],
            })
        } catch {
            throw new NotFoundException()
        }
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.personRepository.findOneBy({ id })
        if (!person) throw new NotFoundException()

        await this.personRepository.update(id, updatePersonDto)

        return await this.personRepository.findOneBy({ id })
    }

    async remove(id: number) {
        const person = await this.personRepository.findOneBy({ id })
        if (!person) throw new NotFoundException()

        this.personRepository.delete(id)

        return person
    }
}
