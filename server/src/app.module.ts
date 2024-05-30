import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GenresModule } from './genres/genres.module'
import { CategoriesModule } from './categories/categories.module'
import { CountriesModule } from './countries/countries.module'
import { PersonsModule } from './persons/persons.module'
import { FilmModule } from './film/film.module'
import { AuthModule } from './auth/auth.module'

import { Film } from './film/entities/film.entity'
import { Person } from './persons/person.entity'
import { Country } from './countries/country.entity'
import { Genre } from './genres/genre.entity'
import { Category } from './categories/category.entity'
import { UsersModule } from './users/users.module'
import { RoleGuard } from './roles/guards/role.guard'
import { APP_GUARD } from '@nestjs/core'
import { User } from './users/user.entity'
import { Role } from './roles/role.entity'
import { RolesModule } from './roles/roles.module'

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
                entities: [Film, Person, Country, Genre, Category, User, Role],
            }),
        }),
        GenresModule,
        CategoriesModule,
        CountriesModule,
        PersonsModule,
        FilmModule,
        UsersModule,
        AuthModule,
        RolesModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
