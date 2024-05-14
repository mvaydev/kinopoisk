import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

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
                dropSchema: true
            })
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
