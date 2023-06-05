import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',

  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})

export class CarouselComponent {
  images = [
    { title: '', short: '', src: "../../assets/images/slider1.jpg" },
    { title: '', short: '', src: "../../assets/images/slider2.jpg" },
    { title: '', short: '', src: "../../assets/images/slider3.jpg" }
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
		config.showNavigationIndicators = false;
  }
}