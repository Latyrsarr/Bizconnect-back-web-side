import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvisModule } from './avis/avis.module';
import { Avis } from './avis/avis.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'LatyrSarr',
      password: 'Passer123',
      database: 'Bizconnect',
      entities: [Avis],
      synchronize: true,
    }),
    AvisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
