import {
    IsAlpha,
    IsArray,
    IsEmail,
    IsLowercase,
    IsNotEmpty,
    IsOptional,
    IsUrl,
} from 'class-validator'
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

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsArray()
    @IsAlpha('en-US', { each: true })
    @IsLowercase({ each: true })
    roleIds: string[]
}
