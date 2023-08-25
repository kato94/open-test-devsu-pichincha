import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ContextMenuComponent]
    });
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must toggle correctly', () => {
    component.toggleContextMenu();
    component.toggleContextMenu();
    component.toggleContextMenu();

    expect(component.showContextMenu).toBeTrue();
  });

  it('Should close correctly', () => {
    component.toggleContextMenu();
    component.closeContextMenu();

    expect(component.showContextMenu).toBeFalse();
  });

  it('It must close when clicking outside the component', () => {
    const relatedTarget = document.createElement('div');
    const event = new MouseEvent('click', { relatedTarget });

    component.toggleContextMenu();
    component.onClickOutside(event);

    expect(component.showContextMenu).toBeFalse();
  });
});
