import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateCountryDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
    @IsNotEmpty()
    name: string
}
