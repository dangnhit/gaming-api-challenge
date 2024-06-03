import fsSync from 'fs';
import fs from 'fs/promises';
import Path from 'path';

import { IStorageClient } from './storage';

export class LocalStorageClient implements IStorageClient {
  private root: string;

  constructor(private readonly bucket: string) {
    const s = bucket.substring(5); // remove fs://
    this.root = Path.join(__dirname, '..', '..', '..', s);
    fsSync.mkdirSync(Path.join(this.root), {
      recursive: true,
    });
  }

  async get(path: string) {
    try {
      return await fs.readFile(Path.join(this.root, path), 'utf8');
    } catch (e) {
      throw e.message.startsWith('ENOENT') ? new Error('not found') : e;
    }
  }

  async getBytes(path: string) {
    try {
      // The only way to let fs.promises.readFile() return a Buffer is to let encoding=null.
      // This is also the default behavior for fs.promises.readFile().
      return await fs.readFile(Path.join(this.root, path));
    } catch (e) {
      throw e.message.startsWith('ENOENT') ? new Error('not found') : e;
    }
  }

  async put(path: string, file: string) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    const parents = path.split('/');
    parents.pop();
    await fs.mkdir(Path.join(this.root, parents.join('/')), {
      recursive: true,
    });

    return await fs.writeFile(Path.join(this.root, path), file);
  }

  async putBytes(path: string, file: Buffer) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    const parents = path.split('/');
    parents.pop();
    await fs.mkdir(Path.join(this.root, parents.join('/')), {
      recursive: true,
    });

    return await fs.writeFile(Path.join(this.root, path), file);
  }

  async del(path: string) {
    if (path.endsWith('/')) {
      path = path.substring(0, path.length - 1);
    }

    try {
      await fs.rm(Path.join(this.root, path), { recursive: true });
    } catch (e) {
      // delete non-existant file is OK
      if (!e.message.startsWith('ENOENT')) {
        throw e;
      }
    }
  }

  async list(path: string) {
    if (path.endsWith('/')) {
      path = path.substring(0, path.length - 1);
    }

    const dir = Path.join(this.root, path);
    try {
      const res = await fs.readdir(dir);
      const files = res.filter((file) => !['.', '..'].includes(file));
      return files;
    } catch (err) {
      throw new Error(`Error reading directory ${dir}: ${err}`);
    }
  }

  async purge() {
    try {
      const res = await fs.readdir(this.root);
      for (const file of res) {
        await fs.rm(Path.join(this.root, file), { recursive: true });
      }
      return true;
    } catch (err) {
      // delete non-existent file is OK
      if (!err.message.startsWith('ENOENT')) {
        throw err;
      }
      return false;
    }
  }
}
