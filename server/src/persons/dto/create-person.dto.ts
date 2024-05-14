import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsLowercase,
    IsNotEmpty,
    IsUrl,
} from 'class-validator'

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
