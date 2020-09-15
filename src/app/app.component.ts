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
  private tabsNewAnim;
  private selectorNewAnim;
  private activeItemNewAnim;
  private activeWidthNewAnimHeight;
  private activeWidthNewAnimWidth;
  private itemPosNewAnimTop;
  private itemPosNewAnimLeft;

  constructor(private apiService: ApiService, ) {
    this.apiService.loadRecipes().then(() => {
      console.log(this.apiService.getRecipes());
      this.test();
    });
  }

  ngOnInit(): void {
  }

  private test(): void {
    this.tabsNewAnim = $('#navbarSupportedContent');
    this.selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    this.activeItemNewAnim = this.tabsNewAnim.find('.active');
    this.activeWidthNewAnimHeight = this.activeItemNewAnim.innerHeight();
    this.activeWidthNewAnimWidth = this.activeItemNewAnim.innerWidth();
    this.itemPosNewAnimTop = this.activeItemNewAnim.position();
    this.itemPosNewAnimLeft = this.activeItemNewAnim.position();
    $('.hori-selector').css({
      top: this.itemPosNewAnimTop.top + 'px',
      left: this.itemPosNewAnimLeft.left + 'px',
      height: this.activeWidthNewAnimHeight + 'px',
      width: this.activeWidthNewAnimWidth + 'px'
    });

    $('#navbarSupportedContent').on('click', 'li', function(e): void {
      console.log($(this));
      this.refresh($(this));
    });
  }

  public refresh(elem): void {
    $('#navbarSupportedContent ul li').removeClass('active');
    elem.addClass('active');
    this.activeWidthNewAnimHeight = $(this).innerHeight();
    this.activeWidthNewAnimWidth = $(this).innerWidth();
    this.itemPosNewAnimTop = $(this).position();
    this.itemPosNewAnimLeft = $(this).position();
    $('.hori-selector').css({
      top: this.itemPosNewAnimTop.top + 'px',
      left: this.itemPosNewAnimLeft.left + 'px',
      height: this.activeWidthNewAnimHeight + 'px',
      width: this.activeWidthNewAnimWidth + 'px'
    });
  }
  onResize($event: any): any {
    this.refresh($('#navbarSupportedContent ul active'));
  }
}
