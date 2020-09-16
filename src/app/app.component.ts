import { Component, OnInit } from '@angular/core';
import { ApiService} from './shared/api-service/api.service';
import { faList } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KochApp';
  img = 'pexels-lukas-349609.jpg';
  navBarIcon = faList;

  constructor(private apiService: ApiService, ) {
    this.apiService.loadRecipes().then(() => {
      console.log(this.apiService.getRecipes());
      // this.test();
      this.toggle();
    });
  }

  ngOnInit(): void {
  }

  // Navbar toggle
  private toggle(): void {
    $('#search-button').on('click', (e) => {
      if ($('#search-input-container').hasClass('hdn')) {
        e.preventDefault();
        $('#search-input-container').removeClass('hdn');
        return false;
      }
    });

    $('#hide-search-input-container').on('click', (e) => {
      e.preventDefault();
      $('#search-input-container').addClass('hdn');
      return false;
    });
  }

  onResize($event: any): any {
    window.location.reload();
  }
}
