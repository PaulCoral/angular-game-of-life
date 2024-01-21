import { Component } from '@angular/core';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { Array2D } from '../../models/array-2d';
import { Point2D } from '../../models/point-2d';
import { Observable, Subscription, concat, forkJoin, interval, of, repeat, timer, zip } from 'rxjs';
import { GameOfLifeRunner } from '../../models/game-of-life-runner';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [GameGridComponent],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.sass'
})
export class GameOfLifeComponent {
  width = 50
  height = 50
  array = this.createDefaultArray()
  simInterval = 50
  running = false
  subscription?: Subscription


  onGridElemClicked(point: Point2D) {
    const {x, y} = point
    this.array.setValueAt(
      x, 
      y,
      !this.array.getValueAt(x, y)
    )
  }

  onButtonClicked() {
    this.running ? this.stopSim() : this.startSim()
  }

  get buttonText() {
    return this.running ? 'STOP' : 'START'
  }

  startSim() {
    this.running = true
    this.subscription = concat(
      new Observable(s => {
        s.next(GameOfLifeRunner.next(this.array))
        s.complete()
      }),
      timer(this.simInterval)
    ).pipe(
      repeat()
    ).subscribe()
  }

  stopSim() {
    this.subscription?.unsubscribe()
    this.running = false
    this.array = this.createDefaultArray()
  }

  createDefaultArray() {
    return new Array2D(this.width, this.height, () => Math.random() < 0.1 ? true : false)
  }
}
