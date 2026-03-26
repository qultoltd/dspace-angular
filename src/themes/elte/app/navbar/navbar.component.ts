import {
  AsyncPipe,
  NgClass,
  NgComponentOutlet,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs'; // Fontos import!
import { GRAPH_VIEWER_PATH } from 'src/app/app-routing-paths';
import { ThemedUserMenuComponent } from 'src/app/shared/auth-nav-menu/user-menu/themed-user-menu.component';
import { MenuService } from 'src/app/shared/menu/menu.service';
import { MenuID } from 'src/app/shared/menu/menu-id.model';
import { LinkMenuItemModel } from 'src/app/shared/menu/menu-item/models/link.model';
import { MenuItemType } from 'src/app/shared/menu/menu-item-type.model';

import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['./navbar.component.scss'],
  // styleUrls: ['../../../../app/navbar/navbar.component.scss'],
  // templateUrl: './navbar.component.html',
  templateUrl: '../../../../app/navbar/navbar.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [NgbDropdownModule, NgClass, NgIf, ThemedUserMenuComponent, NgFor, NgComponentOutlet, AsyncPipe, TranslateModule],
})
export class NavbarComponent extends BaseComponent implements OnInit, OnDestroy {
  // ITT DEKLARÁLJUK a változót, így elűnik a hibaüzenet
  private menuSubs: Subscription[] = [];

  // A BaseComponent-től örökölt szervizek mellé injektáljuk, amit kell
  protected menuService = inject(MenuService);

  ngOnInit() {
    super.ngOnInit();

    // REAKTÍV FIGYELŐ:
    // Feliratkozunk a menüpontok listájára. Ha a DSpace (pl. kereséskor)
    // törli a listát, ez a kód azonnal észreveszi és visszateszi a miénket.
    this.menuSubs.push(
      this.menuService.getMenuTopSections(MenuID.PUBLIC).subscribe((sections) => {
        const exists = sections.some(section => section.id === 'elte_graph_viewer');
        if (!exists) {
          this.addGraphMenu();
        }
      }),
    );
  }

  private addGraphMenu() {
    this.menuService.addSection(MenuID.PUBLIC, {
      id: 'elte_graph_viewer',
      active: true,
      visible: true,
      model: {
        type: MenuItemType.LINK,
        text: 'menu.section.graph-viewer',
        link: '/' + GRAPH_VIEWER_PATH,
      } as LinkMenuItemModel,
      icon: 'network-wired',
      index: 10,
    });
  }

  ngOnDestroy() {
    // Lezárjuk a figyelőt, amikor elhagyjuk az oldalt (memóriaszivárgás ellen)
    this.menuSubs.forEach(sub => sub.unsubscribe());

    if (super.ngOnDestroy) {
      super.ngOnDestroy();
    }
  }
}
