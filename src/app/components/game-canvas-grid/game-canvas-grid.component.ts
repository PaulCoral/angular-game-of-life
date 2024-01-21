import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Array2D } from '../../models/array-2d';
import { Point2D } from '../../models/point-2d';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-canvas-grid',
  standalone: true,
  imports: [],
  templateUrl: './game-canvas-grid.component.html',
  styleUrl: './game-canvas-grid.component.sass'
})
export class GameCanvasGridComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cellSize = 10
  @Input({required: true}) array?: Array2D<boolean>
  @Input() nextSimStepObs?: Observable<void>
  @Output() onGridElemClicked = new EventEmitter<Point2D>()
  
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>

  ngOnInit(): void {
    this.nextSimStepObs?.subscribe(() => {
      if(this.array === undefined){
        console.warn('array is undefined on update')
        return
      }
      this.onArrayChanged(this.array)
    })
  }

  ngAfterViewInit(): void {
    if(this.array){
      this.onArrayChanged(this.array)
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['array']) {
      this.onArrayChanged(changes['array'].currentValue)
    }
  }
  
  onArrayChanged(newArray: Array2D<boolean>) {
    if(this.canvas === undefined) {
      console.warn('canvas is undefined')
      return
    }
    const rows = newArray.toRows()
    if(rows === undefined){
      console.warn('rows is undefined')
      return
    }
    const canvas = this.canvas.nativeElement
    canvas.width = this.cellSize * newArray.width
    canvas.height = this.cellSize * newArray.height
    const ctx = canvas.getContext('2d')

    if(ctx === null) {
      console.warn('ctx is null')
      return
    }

    //ctx?.clearRect(0, 0, canvas.width, canvas.height)
    
    rows.forEach((row, y) => {
      row.forEach((elem, x) => {
        const color = elem ? 'black' : 'white'
        ctx.fillStyle = color
        ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
        ctx.strokeRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
      })
    })
  }
}
