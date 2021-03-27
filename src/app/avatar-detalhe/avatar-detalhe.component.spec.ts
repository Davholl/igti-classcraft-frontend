import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDetalheComponent } from './avatar-detalhe.component';

describe('AvatarDetalheComponent', () => {
  let component: AvatarDetalheComponent;
  let fixture: ComponentFixture<AvatarDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
