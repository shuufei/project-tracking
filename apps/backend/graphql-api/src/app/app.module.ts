import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BacklogModule } from './backlog/backlog.module';
import { BoardModule } from './board/board.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProjectModule,
    BacklogModule,
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
