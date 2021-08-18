import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bis-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
