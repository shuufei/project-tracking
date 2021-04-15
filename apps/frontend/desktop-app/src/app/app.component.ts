import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'bis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Bison';

  constructor(private apollo: Apollo) {}
}
