import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { slideInOutAnimation } from 'src/app/core/animations/slide-in-out.animation';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.sass'],
  animations: [slideInOutAnimation]
})
export class ContextMenuComponent {
  @Input() index?: string;

  showContextMenu = false;
  firstClick = false;

  constructor(private elementRef: ElementRef) {}

  toggleContextMenu(): void {
    this.showContextMenu = !this.showContextMenu;
    this.firstClick = this.showContextMenu;
  }

  closeContextMenu(): void {
    this.showContextMenu = false;
    this.firstClick = false;
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.firstClick && !this.elementRef.nativeElement.contains(target)) {
      this.closeContextMenu();
    }
  }
}
