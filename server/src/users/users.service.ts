import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        if(! await this.userRepository.existsBy({ id: createUserDto.id }))
            return

        const user = this.userRepository.create(createUserDto)
        this.userRepository.save(user)
    }

    async exists(id: string) {
        return await this.userRepository.existsBy({ id })
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async findOne(id: string) {
        return await this.userRepository.findOneBy({ id })
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new NotFoundException()

        await this.userRepository.update(id, updateUserDto)

        return await this.userRepository.findOneBy({ id: updateUserDto.id })
    }

    async remove(id: string) {
        try {
            const user = await this.userRepository.findOneByOrFail({ id })

            this.userRepository.delete(id)

            return user
        } catch (e) {
            throw new NotFoundException()
        }
    }
}
