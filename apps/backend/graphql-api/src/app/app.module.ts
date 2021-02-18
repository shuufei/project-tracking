import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'apps/backend/graphql-api/src/schema.gql'
      ),
    }),
  ],
  controllers: [],
  providers: [AppService, AppController],
})
export class AppModule {}
