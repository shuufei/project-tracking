import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SheetFooterComponent } from './sheet-footer.component';
import { SheetFooterModule } from './sheet-footer.module';

describe('SheetFooterComponent', () => {
  let component: SheetFooterComponent;
  let fixture: ComponentFixture<SheetFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetFooterModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
