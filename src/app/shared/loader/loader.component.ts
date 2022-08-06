import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <div class='loader'></div>
  `,
  styles: [`
    .loader {
      padding: 15px;
      border: 5px solid #000;
      box-shadow: none;
      border-right-color: transparent;
      border-radius: 50%;
      animation: rotate 1s infinite linear;
      position:absolute;
      top:45%;
      left:45%;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
