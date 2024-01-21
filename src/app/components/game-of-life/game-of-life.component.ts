import { Component } from '@angular/core';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { Array2D } from '../../models/array-2d';
import { Point2D } from '../../models/point-2d';
import { Observable, Subject, Subscription, concat, forkJoin, interval, of, repeat, tap, timer, zip } from 'rxjs';
import { GameOfLifeRunner } from '../../models/game-of-life-runner';
import { GameCanvasGridComponent } from '../game-canvas-grid/game-canvas-grid.component';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [GameGridComponent, GameCanvasGridComponent],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.sass'
})
export class GameOfLifeComponent {
  width = 90
  height = 90
  cellSize = 10
  array = this.createDefaultArray()
  simInterval = 1
  running = false
  subscription?: Subscription
  nextSimStepSubject = new Subject<void>()

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
      tap(() => this.nextSimStepSubject.next()),
      repeat()
    ).subscribe()
  }

  stopSim() {
    this.subscription?.unsubscribe()
    this.running = false
    this.array = this.createDefaultArray()
  }

  createDefaultArray() {
    return new Array2D(this.width, this.height, () => Math.random() < 0.5 ? true : false)
  }
}
