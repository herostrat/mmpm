import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";
import { MagicMirrorModulesTableComponent } from "./components/magic-mirror-modules-table/magic-mirror-modules-table.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, MagicMirrorModulesTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
