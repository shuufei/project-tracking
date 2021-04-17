import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), 'libs/shared/schema/src/**/*.gql')],
  path: join(process.cwd(), 'libs/shared/schema/src/lib/schema-types.ts'),
});
