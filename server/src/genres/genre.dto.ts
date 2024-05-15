import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateGenreDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @IsNotEmpty()
    name: string
}
