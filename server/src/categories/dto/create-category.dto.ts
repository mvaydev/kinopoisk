import { IsAlpha, IsLowercase, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string

    @IsNotEmpty()
    name: string
}
