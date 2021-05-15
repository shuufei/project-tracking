import { COGNITO_AUTHENTICATION_PROVIDER } from '@bison/shared/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvalidCognitoAuthenticationProviderError } from '../errors/invalid-cognito-authentication-provider-error';

export const IdpUserId = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    try {
      const gqlCtx = GqlExecutionContext.create(ctx);
      const cognitoAuthenticationProvider = gqlCtx.getContext().req.headers[
        COGNITO_AUTHENTICATION_PROVIDER
      ];
      return cognitoAuthenticationProvider.split('/')[2].split(':')[2];
    } catch {
      throw new InvalidCognitoAuthenticationProviderError();
    }
  }
);
