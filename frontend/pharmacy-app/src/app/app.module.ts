import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
    // otros componentes aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule // 👈 necesario para usar HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
