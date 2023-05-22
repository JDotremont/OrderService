import dotenv from 'dotenv';
import config from '../../config/config.json' assert { type: "json" };
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize({
  ...config[env],
});