import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetailHeaderComponent } from './components/board-detail-header/board-detail-header.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ExampleHeaderComponent } from './components/example-header/example-header.component';
import { ExampleComponent } from './components/example/example.component';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardDetailComponent,
  },
  {
    path: 'boards/:boardId',
    component: BoardDetailHeaderComponent,
    outlet: 'header',
  },
  // TODO: 下のExampleComponentとExampleHeaderComponentを削除して代わりにプロジェクト詳細(とそのヘッダー)コンポーネントを配置してください。
  {
    path: '',
    component: ExampleComponent,
  },
  {
    path: '',
    component: ExampleHeaderComponent,
    outlet: 'header',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}
