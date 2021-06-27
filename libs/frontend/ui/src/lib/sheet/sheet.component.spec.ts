import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SheetComponent } from './sheet.component';
import { SheetModule } from './sheet.module';

describe('SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
