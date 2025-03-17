import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let fbSpy: jasmine.SpyObj<FormBuilder>;
  let routeSpy: jasmine.SpyObj<ActivatedRoute>;
  let routerSpy: jasmine.SpyObj<Router>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    fbSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    routeSpy = jasmine.createSpyObj('ActivatedRoute', [], { params: of({ id: 1 }) });
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameById', 'updateGame']);

    TestBed.configureTestingModule({
      imports: [EditComponent],
      providers: [
        { provide: FormBuilder, useValue: fbSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
