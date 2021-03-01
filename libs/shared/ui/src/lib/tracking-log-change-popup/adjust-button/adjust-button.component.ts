import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-adjust-button',
  templateUrl: './adjust-button.component.html',
  styleUrls: ['./adjust-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjustButtonComponent {}
