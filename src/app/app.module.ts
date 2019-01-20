import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { NodeComponent } from './xml-view/node/node.component';
import { ArrayComponent } from './xml-view/array/array.component';
import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';
import { SelectionComponent } from './selection/selection.component';

@NgModule({
  declarations: [
    AppComponent,
    XmlViewComponent,
    NodeComponent,
    ArrayComponent,
    AbstractNodeComponent,
    SelectionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}

}
