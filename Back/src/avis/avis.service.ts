import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis)
    private avisRepository: Repository<Avis>,
  ) {}

  // Créer un nouvel avis
  async createAvis(note_business: number, commentaire_busi: string, id_business: number): Promise<Avis> {
    const nouvelAvis = this.avisRepository.create({ note_business, commentaire_busi, id_business });
    return await this.avisRepository.save(nouvelAvis);
  }

  // Récupérer les avis filtrés par id_business et triés du plus récent au plus ancien
  async findAvisByBusiness(id_business: number): Promise<Avis[]> {
    return await this.avisRepository.find({
      where: { id_business },
      order: { id: 'DESC' },  // Tri par ID décroissant
    });
  }
}
