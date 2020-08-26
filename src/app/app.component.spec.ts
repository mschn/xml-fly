import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToolbarComponent } from './toolbar/toolbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HotkeyModule.forRoot()
      ],
      declarations: [
        AppComponent, ToolbarComponent
      ],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
