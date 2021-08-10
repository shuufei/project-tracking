import type { ISubtaskRepository } from '@bison/backend/domain';
import { SUBTASK_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetSubtaskByIdService } from './get-subtask-by-id.service.interface';

export class GetSubtaskByIdService implements IGetSubtaskByIdService {
  constructor(
    @Inject(SUBTASK_REPOSITORY) private subtaskRepository: ISubtaskRepository
  ) {}

  async handle(
    ...args: Parameters<IGetSubtaskByIdService['handle']>
  ): ReturnType<IGetSubtaskByIdService['handle']> {
    const [subtaskId] = args;
    return this.subtaskRepository.getById(subtaskId);
  }
}
