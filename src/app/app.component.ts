import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  xmlFileContent: string;

  loading = false;

  onFileChange(event: Event) {
    this.loading = true;
    this.xmlFileContent = null;
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        this.xmlFileContent = reader.result.toString();
        this.loading = false;
      };
    }
  }

}
