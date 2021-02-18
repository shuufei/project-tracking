import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs/operators';
import { Query } from './api';

@Component({
  selector: 'bis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<Query['sample']>({
        query: gql`
          {
            sample {
              id
              name
            }
          }
        `,
      })
      .pipe(tap(console.log))
      .subscribe();
  }
}
