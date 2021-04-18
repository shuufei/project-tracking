import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
