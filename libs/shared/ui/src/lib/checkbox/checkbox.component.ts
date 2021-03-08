import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, OnDestroy {
  @Input()
  set checked(value: boolean) {
    this.checkbox.setValue(value);
  }
  @Output() changedCheck = new EventEmitter<boolean>();

  readonly checkbox = new FormControl(false);

  private readonly emitCheckHandler$ = this.checkbox.valueChanges.pipe(
    tap((value) => {
      this.changedCheck.emit(value);
    })
  );

  private readonly onDestroy$ = new Subject<void>();

  ngOnInit() {
    this.emitCheckHandler$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
