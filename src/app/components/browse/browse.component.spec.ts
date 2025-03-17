import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseComponent } from './browse.component';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGames']);

    await TestBed.configureTestingModule({
      imports: [BrowseComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
