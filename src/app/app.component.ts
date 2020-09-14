import { Component } from '@angular/core';
import { ApiService} from './shared/api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KochApp';

  constructor(private apiService: ApiService) {
    this.apiService.loadRecipes().then(() => {
      console.log(this.apiService.getRecipes());
    });
  }
}
