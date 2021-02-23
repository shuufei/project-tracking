import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bison-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyComponent {}
