import {
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Resolves a metadata field key (e.g. `dc.title`) to its localised label.
 *
 * Returns an empty string when no translation exists, so the full-item-page
 * label column stays blank instead of echoing the raw key. Uses
 * `translate.stream()` (combined with the async pipe in the template) so the
 * label updates reactively on language change; the pipe itself is pure, so the
 * stream is created once per key and cached — no per-change-detection work. This
 * replaces the previous `getTranslation()` component method. (QREPO-413)
 */
@Pipe({
  name: 'dsMetadataLabel',
})
export class MetadataLabelPipe implements PipeTransform {

  private translate = inject(TranslateService);

  transform(key: string): Observable<string> {
    return this.translate.stream(key).pipe(
      map((translation: string) => (translation === key ? '' : translation)),
    );
  }

}
