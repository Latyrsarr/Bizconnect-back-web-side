import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EtatProfil {
  EN_ATTENTE = 'en_attente_de_validation',
  ACTIVE = 'active',
  DESACTIVE = 'desactive',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  nom_complet: string;

  @Column({ nullable: true })
  post: string;

  // CONTACT PERSONNEL
  @Column({ nullable: true })
  contact_url: string;

  @Column({ nullable: true })
  num_contact: string;

  @Column({ nullable: true })
  mail_contact: string;

  @Column({ nullable: true })
  address_contact: string;

  @Column({ type: 'jsonb', nullable: true })
  reseaux_sociaux_contact: Record<string, any>;

  // ENTREPRISE

  @Column({ nullable: true })
  nom_entreprise: string;

  @Column({ nullable: true })
  num_entreprise: string;

  @Column({ nullable: true })
  mail_entreprise: string;

  @Column({ nullable: true })
  address_entreprise: string;

  @Column({ type: 'jsonb', nullable: true })
  reseaux_sociaux_entreprise: Record<string, any>;

  @Column({ nullable: true })
  url_logo_entreprise: string;

  @Column({ nullable: true })
  url_professionnel_photo: string;

  // ÉTAT DU PROFIL
  @Column({
    type: 'enum',
    enum: EtatProfil,
    default: EtatProfil.EN_ATTENTE,
  })
  etat: EtatProfil;

  @Column({ nullable: true })
  pallette_couleur: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
