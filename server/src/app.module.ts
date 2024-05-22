import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GenresModule } from './genres/genres.module'
import { CategoriesModule } from './categories/categories.module'
import { CountriesModule } from './countries/countries.module'
import { PersonsModule } from './persons/persons.module'
import { FilmModule } from './film/film.module'

import { Film } from './film/entities/film.entity'
import { Person } from './persons/person.entity'
import { Country } from './countries/country.entity'
import { Genre } from './genres/genre.entity'
import { Category } from './categories/category.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/user.entity'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                database: process.env.DB_DATABASE,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                synchronize: true,
                entities: [Film, Person, Country, Genre, Category, User],
            }),
        }),
        GenresModule,
        CategoriesModule,
        CountriesModule,
        PersonsModule,
        FilmModule,
        UsersModule,
    ],
})
export class AppModule {}
