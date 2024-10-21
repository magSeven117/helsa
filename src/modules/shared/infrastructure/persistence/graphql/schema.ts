import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { join } from 'path';

export const getSchema = () => {
  return loadSchemaSync(join(process.cwd(), '/src/modules/shared/infrastructure/graphql/schema/**/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
};
