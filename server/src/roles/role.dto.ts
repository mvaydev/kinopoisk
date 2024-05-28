import { IsAlpha, IsLowercase } from 'class-validator'

export class CreateRoleDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string
}

export class UpdateRoleDto {
    @IsAlpha('en-US')
    @IsLowercase()
    id: string
}
