import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '../services/images.service';


@Controller('images')
export class ImagesController {

    constructor(private readonly imageService: ImagesService) {

    }

    @Post('/')
    @UseInterceptors(FilesInterceptor('images'))
    async create(@UploadedFiles() images: Array<Express.Multer.File>) {
        let allImages = []
        for (let image of images) {
            const anImage = await this.imageService.create(image)
            allImages.push(anImage)
        }
        return allImages;
    }

    @Get('/')
    async findAll() {
        const allImages = await this.imageService.find()
        return {count:allImages.length, images:allImages}
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.imageService.findOne(id)
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        await this.imageService.remove
    }
}
