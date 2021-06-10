import { MockProjectRepository } from '@bison/backend/domain';
import { COLOR, createId, Project } from '@bison/shared/domain';
import { CreateProjectService } from './create-project.service';
import { CreateProjectServiceInput } from './create-project.service.interface';

describe('CreateProjectService', () => {
  let service: CreateProjectService;
  const projectRepository = new MockProjectRepository();

  beforeEach(() => {
    service = new CreateProjectService(projectRepository);
  });

  describe('正常系', () => {
    const input: CreateProjectServiceInput = {
      name: 'project name 0001',
      description: 'project description 0001',
      color: COLOR.Blue,
      adminUserId: createId(),
    };
    let serviceRes: Project;

    beforeEach(async () => {
      jest.spyOn(projectRepository, 'create');
      serviceRes = await service.handle(input);
    });

    it('repositoryにprojectが登録される', () => {
      expect(projectRepository.create).toHaveBeenCalledWith({
        ...input,
        id: expect.anything(),
      });
    });
    it('登録したprojectを取得できる', () => {
      expect(serviceRes).toEqual({
        ...input,
        id: expect.anything(),
      });
    });
  });
});
