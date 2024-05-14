import { Module } from '@nestjs/common'
import { PersonsService } from './persons.service'
import { PersonsController } from './persons.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './entities/person.entity'
import { Country } from 'src/countries/entities/country.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Person, Country])],
    controllers: [PersonsController],
    providers: [PersonsService],
})
export class PersonsModule {}
