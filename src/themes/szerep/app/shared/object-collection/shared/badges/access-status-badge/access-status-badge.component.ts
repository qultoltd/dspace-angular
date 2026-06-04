import {
  Component,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { AccessStatusBadgeComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/access-status-badge/access-status-badge.component';

@Component({
  selector: 'ds-themed-access-status-badge',
  styleUrls: ['./access-status-badge.component.scss'],
  templateUrl: './access-status-badge.component.html',
  // templateUrl: '../../../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status-badge.component.html',
  imports: [
    TranslateModule,
  ],
})
export class AccessStatusBadgeComponent extends BaseComponent implements OnInit {
  accessStatus: string;

  constructor(linkService: LinkService) {
    super(linkService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const accessMetadata = this.object.metadata?.['dc.rights.access']?.[0]?.value;
    switch (accessMetadata){
      case 'SZE-EK meghatározott területén elérhető': {
        this.accessStatus = 'limited';
        break;
      }
      case 'Nyilvánosan hozzáférhető': {
        this.accessStatus = 'public';
        break;
      }
      default: {
        this.accessStatus = null;
        break;
      }

    }
  }
}
