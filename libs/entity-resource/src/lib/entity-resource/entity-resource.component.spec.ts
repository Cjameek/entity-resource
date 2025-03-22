import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityResourceComponent } from './entity-resource.component';

describe('EntityResourceComponent', () => {
  let component: EntityResourceComponent;
  let fixture: ComponentFixture<EntityResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityResourceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
