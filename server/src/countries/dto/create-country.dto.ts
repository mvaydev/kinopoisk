import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'

export class CreateCountryDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}