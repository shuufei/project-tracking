import { Module } from '@nestjs/common';
import { BacklogReolver } from './backlog.resolver';

@Module({
  providers: [BacklogReolver],
})
export class BacklogModule {}
