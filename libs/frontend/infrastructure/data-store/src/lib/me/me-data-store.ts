import { Injectable } from '@angular/core';
import { IMeDataStore } from '@bison/frontend/domain';
import { User } from '@bison/shared/schema';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GET_ME } from './gql/get-me';

@Injectable()
export class MeDataStore implements IMeDataStore {
  constructor(private apollo: Apollo) {}

  me$() {
    return this.apollo
      .watchQuery<{ viewer: User }>({ query: GET_ME })
      .valueChanges.pipe(
        map((response) => {
          return response.data.viewer;
        })
      );
  }
}
