import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { NodeComponent } from './xml-view/node/node.component';
import { ArrayComponent } from './xml-view/array/array.component';
import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';
import { SelectionComponent } from './selection/selection.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StartComponent } from './start/start.component';
import { ShareComponent } from './share/share.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    XmlViewComponent,
    NodeComponent,
    ArrayComponent,
    AbstractNodeComponent,
    SelectionComponent,
    SearchComponent,
    ToolbarComponent,
    StartComponent,
    ShareComponent,
  ],
  imports: [BrowserModule, NgbModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() { }
}
