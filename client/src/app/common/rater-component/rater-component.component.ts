import { Component, OnInit, Input } from '@angular/core';

declare var Array;

@Component({
  selector: 'app-rater-component',
  templateUrl: './rater-component.component.html',
  styleUrls: ['./rater-component.component.css']
})
export class RaterComponentComponent implements OnInit {
  @Input() rating: number;
  _max: number;
  numbers: Array<number>;

  @Input()
  set max(max: string | number) {
    max = +(max || '5');
    this.numbers = Array(max).fill().map((x, i) => (i + 1));
    this._max = max;
  }

  get max(): string | number { return this._max; }

  constructor() {}

  ngOnInit() {
  }

}
