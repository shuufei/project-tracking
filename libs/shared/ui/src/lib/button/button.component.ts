import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import type { Color } from '../types';

@Component({
  selector:
    'button[ui-button], button[ui-stroked-button], button[ui-fill-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() color: Color = 'basic';

  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();
  private readonly afterViewInit$ = new Subject<void>();

  // Event Handlers
  private readonly setColorClassHandler$ = this.afterViewInit$.pipe(
    tap(() => {
      this.getHostElement().classList.add(this.color);
    })
  );

  constructor(private elementRef: ElementRef) {
    merge(this.setColorClassHandler$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnInit() {
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }
}
