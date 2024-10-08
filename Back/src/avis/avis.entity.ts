import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avis')  
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column({ type: 'int' })
  id_business: number;  

  @Column({ type: 'int' })
  note_business: number;
  
  @Column({ type: 'text' })
  commentaire_busi: string; 
}
