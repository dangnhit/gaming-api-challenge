import { IStorageClient, createStorageClient } from './storage';

export default class AppStorage {
  private client: IStorageClient;

  constructor() {
    this.client = createStorageClient(process.env.STORAGE_BUCKET, process.env.REGION);
  }

  async get(path: string): Promise<string> {
    return await this.client.get(path);
  }

  async getBytes(path: string): Promise<Buffer> {
    return await this.client.getBytes(path);
  }

  async put(path: string, file: string) {
    return await this.client.put(path, file);
  }

  async putBytes(path: string, file: Buffer) {
    return await this.client.putBytes(path, file);
  }

  async del(path: string) {
    return await this.client.del(path);
  }

  async list(path: string) {
    return await this.client.list(path);
  }

  async purge() {
    return await this.client.purge();
  }
}
