import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BoardModule } from './resolvers/board/board.module';
import { ProjectModule } from './resolvers/project/project.module';
import { UserModule } from './resolvers/user/user.module';

@Module({
  imports: [
    ProjectModule,
    BoardModule,
    UserModule,
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), 'libs/shared/schema/src/**/*.gql')],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
