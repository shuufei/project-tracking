import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiNotificationsModule,
  TuiRootModule,
  TuiSvgModule,
  TUI_ICONS_PATH,
} from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { ProjectPageModule } from './pages/project-page/project-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ProjectPageModule,
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    TuiRootModule,
    TuiSvgModule,
    TuiNotificationsModule,
  ],
  providers: [
    /**
     * default: (name) => name.includes('.svg#') ? name : `#${name}`
     * https://github.com/TinkoffCreditSystems/taiga-ui/blob/173213fa013c73ea38e2afbc16c5ba3f3996bae3/projects/core/constants/default-icons-path.ts
     */
    {
      provide: TUI_ICONS_PATH,
      useValue: (name: string) => {
        return `assets/taiga-ui/icons/${name}.svg#${name}`;
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
