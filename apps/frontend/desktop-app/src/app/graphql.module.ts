import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { COGNITO_AUTHENTICATION_PROVIDER } from '@bison/shared/constants';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { idpUserId_ShuuheiHanashiro } from '../../../../../construction/dynamodb/sample-data/data/project-user';
import { environment } from '../environments/environment';

// TODO: environmen.productionでurlを変更する
const uri = 'http://localhost:3333/graphql';
const idpUserId = idpUserId_ShuuheiHanashiro;
const headers = new HttpHeaders(
  environment.production
    ? {}
    : {
        [COGNITO_AUTHENTICATION_PROVIDER]:
        // eslint-disable-next-line max-len
        `cognito-idp.region.amazonaws.com/user_pool_id,cognito-idp.region.amazonaws.com/user_pool_id:CognitoSignIn:${idpUserId}`,
      }
);
export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({
      uri,
      headers,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            viewer: {
              merge: true,
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
      },
    },
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
