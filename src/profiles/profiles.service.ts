import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EtatProfil, Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private repo: Repository<Profile>,
  ) {}

  private async generateUniqueCode(): Promise<string> {
    let code: string;
    let exists: Profile | null;

    do {
        // Génère un code aléatoire de 6 caractères, ex: PROF-1A2B3C
        code = 'PROF-' + randomBytes(3).toString('hex').toUpperCase();

        // Vérifie s'il existe déjà dans la base
        exists = await this.repo.findOne({ where: { code } });
    } while (exists); // tant qu'un profil avec ce code existe

    return code;
  }


  async create(dto: CreateProfileDto) {
    const code = await this.generateUniqueCode();
    const profile = this.repo.create({ ...dto, code });
    return this.repo.save(profile);
  }

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const profile = await this.repo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profil non trouvé');
    return profile;
  }

  async filterByCode(code: string) {
    const profile = await this.repo.findOne({ where: { code } });
    if (!profile) throw new NotFoundException('Profil non trouvé pour ce code');
    return profile;
  }

  async filterByEtat(etat: EtatProfil) {
    return this.repo.find({ where: { etat }, order: { createdAt: 'DESC' } });
  }

  async update(id: number, dto: UpdateProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.repo.save(profile);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return this.repo.remove(profile);
  }
}
