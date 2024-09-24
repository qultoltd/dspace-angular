import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccessStatusDataService } from 'src/app/core/data/access-status-data.service';
import { AccessStatusBadgeComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/access-status-badge/access-status-badge.component';

@Component({
  selector: 'ds-themed-access-status-badge',
  styleUrls: ['./access-status-badge.component.scss'],
  templateUrl: './access-status-badge.component.html',
  // templateUrl: '../../../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status-badge.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule],
})
export class AccessStatusBadgeComponent extends BaseComponent {
  accessStatus: string;

  constructor(private accessStatusService: AccessStatusDataService) {
    super(accessStatusService); 
  }

  ngOnInit(): void {
    super.ngOnInit();
    const accessMetadata = this.object.metadata?.["dc.contributor.author"]?.[0]?.value;
    switch(accessMetadata){
      // case "SZE-EK meghatározott területén elérhető": {
        case "Raine, Rosalind": {
        this.accessStatus = "limited";
        break;
      }
      // case "Nyilvánosan hozzáférhető":{
        case "Wioland, Hugo":{
        this.accessStatus = "public";
        break;
      }
      default: {
        this.accessStatus = null;
        break;
      }
      
    }
  }
}
