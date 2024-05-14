import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'

export class CreateGenreDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}
