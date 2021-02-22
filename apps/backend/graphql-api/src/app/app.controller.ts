import { Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@ObjectType()
export class SampleObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@Resolver(() => SampleObject)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Query(() => SampleObject)
  sample(): SampleObject {
    return {
      id: 'id00',
      name: 'name00',
    };
  }
}
