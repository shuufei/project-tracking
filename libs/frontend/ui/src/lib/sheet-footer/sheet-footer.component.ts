import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-sheet-footer',
  templateUrl: './sheet-footer.component.html',
  styleUrls: ['./sheet-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SheetFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
