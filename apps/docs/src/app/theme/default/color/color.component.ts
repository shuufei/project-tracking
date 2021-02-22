import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bison-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
