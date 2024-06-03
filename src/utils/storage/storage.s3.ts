import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { reduce } from 'lodash';

import { IStorageClient } from './storage';

export class S3StorageClient implements IStorageClient {
  private s3: S3Client;
  private bucket: string;

  constructor(_bucket: string, region: string) {
    this.bucket = _bucket.substring(5); // remove s3://
    this.s3 = new S3Client({ region });
  }

  async get(path: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    const response = await this.s3.send(command);
    return await response.Body.transformToString();
  }

  async getBytes(path: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    const response = await this.s3.send(command);
    return Buffer.from(await response.Body.transformToByteArray());
  }

  async put(path: string, text: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const command = new PutObjectCommand({
      ACL: 'bucket-owner-full-control',
      Bucket: this.bucket,
      Key: path,
      ContentLength: text.length,
      ContentType: 'text/plain',
      Body: text,
    });

    await this.s3.send(command);
  }

  async putBytes(path: string, buffer: Buffer) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const command = new PutObjectCommand({
      ACL: 'bucket-owner-full-control',
      Bucket: this.bucket,
      Key: path,
      ContentLength: buffer.length,
      ContentType: 'application/octet-stream',
      Body: buffer,
    });

    await this.s3.send(command);
  }

  async del(path: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    await this.s3.send(command);
  }

  async list(path: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const params = {
      Bucket: this.bucket,
      Prefix: path,
    };

    try {
      const command = new ListObjectsCommand(params);
      const res = await this.s3.send(command);
      return reduce(
        res.Contents,
        (acc, x) => {
          const s = path.length === 0 ? x.Key : x.Key.substring(path.length + 1);
          if (s) {
            acc.push(s);
          }
          return acc;
        },
        [],
      );
    } catch (err) {
      throw new Error(`Error reading directory ${path}: ${err}`);
    }
  }

  async purge() {
    const params = {
      Bucket: this.bucket,
    };

    try {
      const command = new ListObjectsCommand(params);
      const res = await this.s3.send(command);
      const keys = res.Contents.map((file) => ({ Key: file.Key }));
      const deleteObjectsParams = {
        Bucket: this.bucket,
        Delete: { Objects: keys },
      };

      const deleteObjectsCommand = new DeleteObjectsCommand(deleteObjectsParams);
      await this.s3.send(deleteObjectsCommand);
      return true;
    } catch (err) {
      throw new Error(`Error purging directory: ${err}`);
    }
  }
}
