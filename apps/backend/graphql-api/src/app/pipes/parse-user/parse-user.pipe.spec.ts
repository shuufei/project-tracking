import {
  MockGetUserByIdpUserIdService,
  mockGetUserByIdpUserIdServiceReturnValues,
} from '@bison/backend/application';
import { ParseUserPipe } from './parse-user.pipe';
describe('ParseUserPipe', () => {
  let service: ParseUserPipe;
  const mockGetUserByIdpUserIdService = new MockGetUserByIdpUserIdService();
  const idpUserId = 'idpUserId0001';

  beforeEach(() => {
    service = new ParseUserPipe(mockGetUserByIdpUserIdService);
    jest.spyOn(mockGetUserByIdpUserIdService, 'handle');
  });

  test('idpUserIdでuserを取得する', async () => {
    await service.transform(idpUserId);
    expect(mockGetUserByIdpUserIdService.handle).toHaveBeenCalledWith(
      idpUserId
    );
  });

  test('user情報を取得できる', async () => {
    const actual = await service.transform(idpUserId);
    expect(actual).toEqual(mockGetUserByIdpUserIdServiceReturnValues.handle);
  });
});
