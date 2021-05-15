import { COGNITO_AUTHENTICATION_PROVIDER } from '@bison/shared/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IdpUserId = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req.headers[
      COGNITO_AUTHENTICATION_PROVIDER
    ];
    return request;
  }
);
