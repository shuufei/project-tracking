import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {}
