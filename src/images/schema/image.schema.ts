import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document} from "mongoose" 

@Schema({timestamps:true})
export class Image {
    @Prop()
    url:string;

    @Prop()
    bucket:string

    @Prop()
    key:string
}

export type ImageDocument = Image & Document 
export const ImageSchema = SchemaFactory.createForClass(Image)