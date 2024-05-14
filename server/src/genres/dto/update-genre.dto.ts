import { PartialType } from '@nestjs/mapped-types'
import { CreateGenreDto } from './create-genre.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @IsNotEmpty()
    name: string
}
