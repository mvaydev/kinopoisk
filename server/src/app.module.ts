import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GenresModule } from './genres/genres.module'
import { CategoriesModule } from './categories/categories.module'
import { CountriesModule } from './countries/countries.module'
import { PersonsModule } from './persons/persons.module'

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
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        GenresModule,
        CategoriesModule,
        CountriesModule,
        PersonsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
