import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/profile.entity';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    // Configuration pour les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CloudinaryModule,
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      // URL de connexion Neon (à mettre dans .env)
      url: process.env.DATABASE_URL,
      // OU configuration individuelle (alternative)
      /*
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      */
      entities: [Profile],
      synchronize: process.env.NODE_ENV !== 'production', // Désactiver en production
      autoLoadEntities: true,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false, // Nécessaire pour Neon
      } : false,
    }),
    ProfilesModule,
  ],
})
export class AppModule {}
