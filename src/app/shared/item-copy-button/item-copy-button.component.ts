import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { DSpaceObject } from '../../core/shared/dspace-object.model';

@Component({
  selector: 'item-copy-button',
  templateUrl: './item-copy-button.component.html',
  styleUrls: ['./item-copy-button.component.scss']
})

/**
 * Display a button linking to the edit page of a DSpaceObject
 */
export class ItemCopyButtonComponent implements OnInit {
  /**
   * The DSpaceObject to display a button to the edit page for
   */
  @Input() item: DSpaceObject;

  /**
   * The prefix of the route to the edit page (before the object's UUID, e.g. "items")
   */
  @Input() pageRoutePrefix: string;

  /**
   * A message for the tooltip on the button
   * Supports i18n keys
   */
  @Input() tooltipMsg: string;

  /**
   * Whether or not the current user is authorized to edit the DSpaceObject
   */
  isAuthorized$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthorized$ = this.authService.isAuthenticated();
  }

}
