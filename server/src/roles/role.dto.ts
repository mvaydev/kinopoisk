import { IsAlpha, IsUUID, IsUppercase } from 'class-validator'
import { UUID } from 'crypto'

export class AddRoleDto {
    @IsUUID(4)
    userId: UUID

    @IsAlpha('en-US')
    @IsUppercase()
    roleId: string
}
