import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetadataRepresentationListElementComponent } from 'src/app/shared/object-list/metadata-representation-list-element/metadata-representation-list-element.component';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { MetadataValue } from 'src/app/core/shared/metadata.models';
import { ItemMetadataRepresentation } from 'src/app/core/shared/metadata-representation/item/item-metadata-representation.model';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';

@Component({
  selector: 'ds-item-metadata-representation-list-element',
  templateUrl: './generic-item-metadata-list-element.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    NgbTooltipModule,
    TruncatableComponent,
  ],
})
export class GenericItemMetadataListElementComponent extends MetadataRepresentationListElementComponent implements OnInit, OnDestroy {

  @Input() mdRepresentation!: ItemMetadataRepresentation;

  itemPageRoute = '';
  titleForUiLang = '';
  descriptionForUiLang = '';

  private subs: Subscription[] = [];

  constructor(private translate: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this.itemPageRoute = getItemPageRoute(this.mdRepresentation);
    this.localizeTexts(this.translate.currentLang);

    this.subs.push(
      this.translate.onLangChange.subscribe(e => this.localizeTexts(e.lang)),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s?.unsubscribe());
  }

  private localizeTexts(lang: string): void {
    this.titleForUiLang = this.pickByLang(['dc.title'], lang) ?? '';
    this.descriptionForUiLang = this.pickByLang(['dc.description'], lang) ?? '';
  }

  private pickByLang(keys: string[], uiLanguage: string): string | undefined {
    const metadataValues = this.mdRepresentation.allMetadata(keys) as MetadataValue[] | undefined;
    if (!metadataValues?.length){
      return undefined;
    }

    const normalizeLanguage = (s?: string) => (s ?? '').toLowerCase();
    const getLanguageBase = (s?: string) => normalizeLanguage(s).split(/[_-]/)[0];

    const currentLocale = normalizeLanguage(uiLanguage);
    const currentLangBase = getLanguageBase(uiLanguage);

    const exactMatch = metadataValues.find(v => normalizeLanguage(v.language) === currentLocale);
    if (exactMatch) {
      return exactMatch.value;
    }
    const baseLangMatch = metadataValues.find(v => getLanguageBase(v.language) === currentLangBase);
    if (baseLangMatch) {
      return baseLangMatch.value;
    }
    const languageAgnostic = metadataValues.find(v => !v.language);
    if (languageAgnostic) {
      return languageAgnostic.value;
    }
    return metadataValues[0]?.value;
  }
}
