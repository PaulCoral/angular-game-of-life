import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCanvasGridComponent } from './game-canvas-grid.component';

describe('GameCanvasGridComponent', () => {
  let component: GameCanvasGridComponent;
  let fixture: ComponentFixture<GameCanvasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCanvasGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCanvasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
