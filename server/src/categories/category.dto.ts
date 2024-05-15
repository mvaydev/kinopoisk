import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateCategoryDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty()
    name: string
}
