import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrudComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
