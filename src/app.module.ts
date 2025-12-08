import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'forage_user',
      password: 'Mot2PasseSecure456!',      // ← mets ton mot de passe
      database: 'profilsdb',     // ← nom de ta base
      entities: [Profile],       
      synchronize: true,         // Dev ONLY → auto create tables
      autoLoadEntities: true,
    }),
    ProfilesModule,
  ],
})
export class AppModule {}
