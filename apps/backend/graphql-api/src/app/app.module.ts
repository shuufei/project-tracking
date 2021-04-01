import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BacklogModule } from './backlog/backlog.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ProjectModule,
    BacklogModule,
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), 'apps/backend/graphql-api/src/**/*.gql')],
      definitions: {
        path: join(process.cwd(), 'apps/backend/graphql-api/src/types.ts'),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
