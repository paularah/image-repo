import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImagesController } from './controllers/images.controller';
import { ImagesService } from './services/images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema} from './schema/image.schema';
import { S3service } from './services/s3.service';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{
        name:Image.name,
        schema:ImageSchema
    }])],
    controllers:[ImagesController],
    providers:[ImagesService, S3service]
})
export class ImagesModule {}

