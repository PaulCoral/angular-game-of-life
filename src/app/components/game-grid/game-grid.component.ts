import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Array2D } from '../../models/array-2d';
import { OutletContext } from '@angular/router';
import { Point2D } from '../../models/point-2d';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.sass'
})
export class GameGridComponent {
  @Input({required: true}) array?: Array2D<boolean>
  @Output() onGridElemClicked = new EventEmitter<Point2D>()

  constructor() {}

  _onGridClicked(x: number, y: number) {
    this.onGridElemClicked.emit({x, y})
  }
}
