import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  // Créer un nouvel avis en passant id_business dans l'URL
  @Post(':id_business')
  async createAvis(
    @Param('id_business') id_business: number,
    @Body('note_business') note: number,
    @Body('commentaire_busi') commentaire: string,
  ): Promise<Avis> {
    return await this.avisService.createAvis(note, commentaire, id_business);
  }

  // Récupérer les avis pour un business spécifique, triés par ordre décroissant
  @Get('business/:id_business')
  async getAvisByBusiness(@Param('id_business') id_business: number): Promise<Avis[]> {
    return await this.avisService.findAvisByBusiness(id_business);
  }
}
