import { DataSource } from 'typeorm';

import config from './configs';

export const AppDataSource = new DataSource(config);

export const connectDataSource = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }
};
