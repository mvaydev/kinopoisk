import { Reflector } from '@nestjs/core'
import { RoleType } from './roles'

export const Roles = Reflector.createDecorator<RoleType[]>()
