import { Component, Input } from '@angular/core';
import { AdminSidebarComponent as BaseComponent } from '../../../../../app/admin/admin-sidebar/admin-sidebar.component';
import {
    AsyncPipe,
    NgClass,
    NgComponentOutlet,
    NgFor,
    NgIf,
  } from '@angular/common';
  import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
  import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 * Component representing the admin sidebar
 */
@Component({
  selector: 'ds-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  standalone: true,
  imports: [NgIf, NgbDropdownModule, NgClass, NgFor, NgComponentOutlet, AsyncPipe, TranslateModule],
})
export class AdminSidebarComponent extends BaseComponent {
  /**
   * Observable that emits the width of the sidebar when expanded
   */
  @Input() expandedSidebarWidth$: Observable<string>;

  /**
   * Observable that emits the width of the sidebar when collapsed
   */
  @Input() collapsedSidebarWidth$: Observable<string>;
}