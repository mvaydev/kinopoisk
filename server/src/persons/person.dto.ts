import {
    IsAlpha,
    IsDateString,
    IsLowercase,
    IsNotEmpty,
    IsUrl,
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreatePersonDto {
    @IsNotEmpty()
    name: string

    @IsDateString()
    birth: Date

    @IsUrl()
    photoUrl: string

    @IsAlpha('en-US')
    @IsLowercase()
    countryId: string
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
