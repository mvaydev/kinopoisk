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
        const candidate = await this.userRepository.findOneBy({
            googleId: createUserDto.googleId,
        })
        if (candidate) return candidate

        const user = this.userRepository.create(createUserDto)
        return await this.userRepository.save(user)
    }

    /**
     * Checks user in database by Google profile's ID
     */
    async exists(googleId: string) {
        return await this.userRepository.existsBy({ googleId })
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
        user.addRoles(updateUserDto.roleIds)

        try {
            return await this.userRepository.save(user)
        } catch (e) {
            throw new BadRequestException({
                message: 'Wrong role IDs',
            })
        }
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
