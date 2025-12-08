import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { EtatProfil } from '../profile.entity';

export class CreateProfileDto {
//   @IsString()
//   code: string;

  @IsString()
  nom_complet: string;

  @IsOptional()
  @IsString()
  post?: string;

  // CONTACT PERSONNEL
  @IsOptional()
  @IsString()
  contact_url?: string;

  @IsOptional()
  @IsString()
  num_contact?: string;

  @IsOptional()
  @IsEmail()
  mail_contact?: string;

  @IsOptional()
  @IsString()
  address_contact?: string;

  @IsOptional()
  reseaux_sociaux_contact?: Record<string, any>;

  @IsString()
  nom_entreprise: string;

  // ENTREPRISE
  @IsOptional()
  @IsString()
  num_entreprise?: string;

  @IsOptional()
  @IsEmail()
  mail_entreprise?: string;

  @IsOptional()
  @IsString()
  address_entreprise?: string;

  @IsOptional()
  reseaux_sociaux_entreprise?: Record<string, any>;

  @IsOptional()
  @IsString()
  url_logo_entreprise?: string;

  @IsOptional()
  @IsString()
  url_professionnel_photo?: string;

  @IsOptional()
  @IsEnum(EtatProfil)
  etat?: EtatProfil;
}
