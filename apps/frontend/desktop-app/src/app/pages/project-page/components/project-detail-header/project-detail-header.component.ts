import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bis-project-detail-header',
  templateUrl: './project-detail-header.component.html',
  styleUrls: ['./project-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
