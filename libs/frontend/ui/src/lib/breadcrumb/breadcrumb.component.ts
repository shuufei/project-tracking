import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type Breadcrumb = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLink?: any;
};

@Component({
  selector: 'ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() relativeTo?: ActivatedRoute;
}
