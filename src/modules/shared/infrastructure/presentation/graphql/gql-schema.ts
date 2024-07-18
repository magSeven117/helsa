import { readFileSync } from 'fs';
import path from 'path';

export const schema = readFileSync(path.join('./schema.graphql'), 'utf8');
