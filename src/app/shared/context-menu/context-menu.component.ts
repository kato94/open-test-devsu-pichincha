import { Component, HostListener } from '@angular/core';
import { slideInOutAnimation } from 'src/app/core/animations/slide-in-out.animation';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.sass'],
  animations: [slideInOutAnimation]
})
export class ContextMenuComponent {
  showContextMenu = false;

  toggleContextMenu(): void {
    this.showContextMenu = !this.showContextMenu;
  }

  closeContextMenu(): void {
    this.showContextMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.context-menu-content') && !target.closest('.context-menu-trigger')) {
      this.closeContextMenu();
    }
  }
}
