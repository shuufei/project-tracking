/* eslint-disable @typescript-eslint/ban-types */
import { COGNITO_AUTHENTICATION_PROVIDER } from '@bison/shared/constants';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { InvalidCognitoAuthenticationProviderError } from '../errors/invalid-cognito-authentication-provider-error';
import { IdpUserId } from './idp-user-id.decorator';

const getContextSpy = jest.fn();

const sub = 'idpUserId0001';
jest.mock('@nestjs/graphql', () => {
  return {
    GqlExecutionContext: {
      create: () => {
        return {
          getContext: getContextSpy,
        };
      },
    },
  };
});

function getParamDecoratorFactory(decorator: Function) {
  class Test {
    public test(@decorator() value: unknown) {
      return value;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

describe('IdpUserIdDecorator', () => {
  afterEach(() => {
    getContextSpy.mockReset();
  });

  describe('正常系', () => {
    const factory = getParamDecoratorFactory(IdpUserId);
    const mockExecutionContext = createMock<ExecutionContext>();

    beforeEach(() => {
      getContextSpy.mockReturnValue({
        req: {
          headers: {
            [COGNITO_AUTHENTICATION_PROVIDER]: `cognito-idp.region.amazonaws.com/user_pool_id,cognito-idp.region.amazonaws.com/user_pool_id:CognitoSignIn:${sub}`,
          },
        },
      });
    });

    test('CognitoUserのidを取得できる', () => {
      const actual = factory(null, mockExecutionContext);
      expect(actual).toBe(sub);
    });
  });

  describe('異常系', () => {
    describe('headerにCognitoAuthenticationProviderが指定されていない時', () => {
      const factory = getParamDecoratorFactory(IdpUserId);
      const mockExecutionContext = createMock<ExecutionContext>();

      beforeEach(() => {
        getContextSpy.mockReturnValue({
          req: {
            headers: {},
          },
        });
      });

      test('Errorがthrowされる', () => {
        expect(() => factory(null, mockExecutionContext)).toThrowError(
          InvalidCognitoAuthenticationProviderError
        );
      });
    });
  });
});
