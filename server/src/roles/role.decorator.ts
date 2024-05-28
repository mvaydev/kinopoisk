import { Reflector } from '@nestjs/core'
import { RolesEnum } from './roles'

export const Roles = Reflector.createDecorator<RolesEnum>()
