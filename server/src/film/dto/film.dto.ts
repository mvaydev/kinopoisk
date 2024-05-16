import { PartialType } from '@nestjs/mapped-types'
import {
    IsAlpha,
    IsArray,
    IsInt,
    IsLowercase,
    IsNotEmpty,
    IsUrl,
} from 'class-validator'

export class CreateFilmDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    originalName: string

    @IsNotEmpty()
    description: string

    @IsInt()
    creationYear: number

    @IsUrl()
    previewUrl: string

    @IsInt()
    ageLimit: number

    @IsAlpha('en-US')
    @IsLowercase()
    categoryId: string

    @IsArray()
    @IsAlpha('en-US', { each: true })
    @IsLowercase({ each: true })
    countryIds: string[]
}

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
