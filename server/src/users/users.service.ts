import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'
import { cloneDeep } from 'lodash'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    /**
     * Create user, if he not created later or returns new user
     */
    async findOrCreate(createUserDto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({
            where: { googleId: createUserDto.googleId },
            relations: ['roles'],
        })
        if (candidate) {
            const mappedUser: any = cloneDeep(candidate)
            mappedUser.roles = candidate.roles.map((role) => role.id)

            return mappedUser
        }

        const user = this.userRepository.create(createUserDto)
        return await this.userRepository.save(user)
    }

    /**
     * Checks user in database by Google profile's ID
     */
    async exists(googleId: string) {
        return await this.userRepository.existsBy({ googleId })
    }

    /**
     * Checks user in database by internal ID
     */
    async existsById(id: UUID) {
        return await this.userRepository.existsBy({ id })
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async findOne(id: UUID) {
        return await this.userRepository.findOneBy({ id })
    }

    async update(id: UUID, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new NotFoundException()

        await this.userRepository.update(id, updateUserDto)

        return await this.userRepository.findOneBy({ id })
    }

    async remove(id: UUID) {
        try {
            const user = await this.userRepository.findOneByOrFail({ id })

            this.userRepository.delete(id)

            return user
        } catch (e) {
            throw new NotFoundException()
        }
    }
}
