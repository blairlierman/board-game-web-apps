import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { PlayerStore } from './home.store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [PlayerStore],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose players$ from the store', (done) => {
    component.players$.subscribe((players) => {
      expect(players).toBeDefined();
      expect(players.length).toBe(2);
      expect(players[0].health).toBe(50);
      expect(players[1].health).toBe(50);
      done();
    });
  });

  it('should update player health through the store', () => {
    const updateSpy = jest.spyOn(component['playerStore'], 'updatePlayer');
    component.updatePlayerHealth(1, 25);
    expect(updateSpy).toHaveBeenCalledWith({
      playerId: 1,
      health: 25,
    });
  });
});
