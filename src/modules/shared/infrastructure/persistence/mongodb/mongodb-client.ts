import { MongoClient } from 'mongodb';
import { env } from '../../config/env';

export const mongodbClient = new MongoClient(env.MONGO_URI);
