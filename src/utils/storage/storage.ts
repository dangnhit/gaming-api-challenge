import { S3StorageClient } from './storage.s3';
import { LocalStorageClient } from './storage.local';

export abstract class IStorageClient {
  abstract get(path: string): Promise<string>;
  abstract getBytes(path: string): Promise<Buffer>;
  abstract put(path: string, file: string): Promise<any>;
  abstract putBytes(path: string, file: Buffer): Promise<any>;
  abstract del(path: string): Promise<any>;
  abstract list(path: string): Promise<string[]>;
  abstract purge(): Promise<boolean>;
}

export function createStorageClient(bucket: string, region?: string): IStorageClient {
  if (bucket.startsWith('fs://')) {
    return new LocalStorageClient(bucket);
  }

  if (bucket.startsWith('s3://')) {
    return new S3StorageClient(bucket, region);
  }
  throw new Error('storage bucket unconfigured');
}
