import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EtatProfil } from './profile.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // @Post()
  // create(@Body() dto: CreateProfileDto) {
  //   return this.profilesService.create(dto);
  // }
  // profiles.controller.ts (version corrigée)
  @Post()
@UseInterceptors(
  FileFieldsInterceptor(
    [
      { name: 'entreprise-logos', maxCount: 1 }, // Accepte votre nom
      { name: 'professionnel-photos', maxCount: 1 }, // Accepte votre nom
    ],
    {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new BadRequestException('Type de fichier non supporté'), false);
        }
        callback(null, true);
      },
    },
  ),
)
async create(
  @Body() dto: CreateProfileDto,
  @UploadedFiles() files: {
    'entreprise-logos'?: Express.Multer.File[];
    'professionnel-photos'?: Express.Multer.File[];
  },
) {
  let url_logo_entreprise: string | undefined;
  let url_professionnel_photo: string | undefined;

  // Notez les noms de propriétés avec tirets
  if (files['entreprise-logos']?.[0]) {
    const result = await this.cloudinaryService.uploadImage(
      files['entreprise-logos'][0],
      'entreprise-logos'
    );
    url_logo_entreprise = result.secure_url;
  }

  if (files['professionnel-photos']?.[0]) {
    const result = await this.cloudinaryService.uploadImage(
      files['professionnel-photos'][0],
      'professionnel-photos'
    );
    url_professionnel_photo = result.secure_url;
  }

  const profileData = {
    ...dto,
    url_logo_entreprise,
    url_professionnel_photo,
  };

  return this.profilesService.create(profileData);
}

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Get('code/:code')
  filterByCode(@Param('code') code: string) {
    return this.profilesService.filterByCode(code);
  }

  @Get('etat/:etat')
  filterByEtat(@Param('etat') etat: EtatProfil) {
    return this.profilesService.filterByEtat(etat);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
