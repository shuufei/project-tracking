import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserIconModule } from '../user-icon/user-icon.module';
import { UserIconListComponent } from './user-icon-list.component';

@NgModule({
  declarations: [UserIconListComponent],
  imports: [CommonModule, UserIconModule],
  exports: [UserIconListComponent],
})
export class UserIconListModule {}
