import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IdpUserId = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    // TODO: headerのkeyはfrontend側でも利用するのでlibs/shared/constantsに共通化する
    const request = gqlCtx.getContext().req.headers[
      'cognitoauthenticationprovider'
    ];
    return request;
  }
);
