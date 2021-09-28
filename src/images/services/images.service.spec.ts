import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { closeMongoConnection, rootMongooseTestModule } from "../utils/test"
import { Image, ImageSchema } from '../schema/image.schema';
import { S3service } from '../services/s3.service';

let mongod: MongoMemoryServer;

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{
        name: Image.name,
        schema: ImageSchema
      }])],
      providers: [ImagesService, S3service],
    }).compile();
    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


afterAll(async () => {
  await closeMongoConnection();
});