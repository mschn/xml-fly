import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { NodeComponent } from './node/node.component';
import { ArrayComponent } from './array/array.component';
import { AbstractNodeComponent } from './abstract-node/abstract-node.component';

@NgModule({
  declarations: [
    AppComponent,
    XmlViewComponent,
    NodeComponent,
    ArrayComponent,
    AbstractNodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}

}
