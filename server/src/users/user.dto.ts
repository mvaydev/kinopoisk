import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {
    @IsNotEmpty()
    googleId: string

    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsUrl()
    photoUrl?: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
