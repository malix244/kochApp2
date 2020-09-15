import { Component, OnInit } from '@angular/core';
import { ApiService} from './shared/api-service/api.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KochApp';
  img = 'pexels-lukas-349609.jpg';
  faCoffee = faCoffee;

  constructor(private apiService: ApiService, ) {
    this.apiService.loadRecipes().then(() => {
      console.log(this.apiService.getRecipes());
      this.test();
    });
  }

  ngOnInit(): void {
  }

  private test(): void {
    const tabsNewAnim = $('#navbarSupportedContent');
    const selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    const activeItemNewAnim = tabsNewAnim.find('.active');
    let activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    let activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    let itemPosNewAnimTop = activeItemNewAnim.position();
    let itemPosNewAnimLeft = activeItemNewAnim.position();

    $('.hori-selector').css({
      top: itemPosNewAnimTop.top + 'px',
      left: itemPosNewAnimLeft.left + 'px',
      height: activeWidthNewAnimHeight + 'px',
      width: activeWidthNewAnimWidth + 'px'
    });

    $('#navbarSupportedContent').on('click', 'li', function(e): void {
      $('#navbarSupportedContent ul li').removeClass('active');
      $(this).addClass('active');
      activeWidthNewAnimHeight = $(this).innerHeight();
      activeWidthNewAnimWidth = $(this).innerWidth();
      itemPosNewAnimTop = $(this).position();
      itemPosNewAnimLeft = $(this).position();
      $('.hori-selector').css({
        top: itemPosNewAnimTop.top + 'px',
        left: itemPosNewAnimLeft.left + 'px',
        height: activeWidthNewAnimHeight + 'px',
        width: activeWidthNewAnimWidth + 'px'
      });
    });
  }

  onResize($event: any): any {
    window.location.reload();
  }
}
