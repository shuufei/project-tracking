import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BoardModule } from './resolvers/board/board.module';
import { ProjectModule } from './resolvers/project/project.module';
import { TaskModule } from './resolvers/task/task.module';
import { TaskGroupModule } from './resolvers/taskGroup/task-group.module';
import { UserModule } from './resolvers/user/user.module';

@Module({
  imports: [
    ProjectModule,
    BoardModule,
    UserModule,
    TaskGroupModule,
    TaskModule,
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), 'libs/shared/schema/src/**/*.gql')],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
