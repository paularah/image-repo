import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from 'aws-sdk';


@Injectable()
export class S3service {
  s3 = new S3
    ();

  constructor(private readonly configService: ConfigService) {

  }
  public async upload(key: string, buffer: Buffer) {
    const s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
    });
    const result = await s3.upload({
      Bucket: this.configService.get<string>('BUCKET_NAME'),
      Body: buffer,
      Key: key,
    }).promise();
    const { Key, Location } = result
    return {
      key: Key,
      url: Location
    }
  }


  public async delete(id) {
    const s3 = new S3();
    return await s3.deleteObject({
      Bucket: this.configService.get<string>('BUCKET_NAME'),
      Key: id,
    }).promise();
  }

}