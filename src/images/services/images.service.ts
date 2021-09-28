import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from '../schema/image.schema';
import {Model} from "mongoose"
import { S3service } from './s3.service';
import { NOTFOUND } from 'dns';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private readonly imageModel:Model<ImageDocument>, private readonly s3service:S3service){}

    async findAll(){
        return this.imageModel.find().exec()
    }

    async create(file){
        let image = new this.imageModel()
        image.key = `${image.id}-${file.originalname}`
        const {url} = await this.s3service.upload(image.key, file.buffer)
        image.url = url 
        await image.save()
        return image

    }

    async findOne(id){
        return this.imageModel.findOne({_id:id}).exec()
    }

    async find(){
        return this.imageModel.find().exec()
    }

    async remove(id){
        let image = await  this.imageModel.findOne(id).exec()
        if(!image) throw new NotFoundException('no image with id exist')
        await this.s3service.delete(image.key)
        await image.remove()
    }
}
