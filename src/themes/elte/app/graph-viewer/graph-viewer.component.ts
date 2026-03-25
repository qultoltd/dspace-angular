import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// Új importok a frontend konfigurációhoz
import {
  APP_CONFIG,
  AppConfig,
} from 'src/config/app-config.interface';

@Component({
  selector: 'ds-rdf-graph-viewer',
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule],
  template: `
    <div class="graph-viewer-container">
      <iframe *ngIf="safeUrl"
              [src]="safeUrl"
              class="graph-iframe"
              frameborder="0">
      </iframe>
    </div>
  `,
  // Ne felejtsd el hozzáadni a stílusfájlt:
  styleUrls: ['./graph-viewer.component.scss'],
})
export class GraphViewerComponent implements OnInit, OnDestroy {
  safeUrl: SafeResourceUrl;
  baseUrl: string;
  private subs: Subscription[] = [];

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //console.log('appConfig:', this.appConfig);
    this.baseUrl = (this.appConfig as any)['graph-viewer']?.url;

    //console.log('graph-viewer url:', this.baseUrl);

    if (this.baseUrl) {
      this.buildSafeUrl();
    }
  }

  private buildSafeUrl(): void {
    if (!this.baseUrl) { return; }

    try {
      const url = new URL(this.baseUrl);
      const rdfQuery = this.route.snapshot.queryParams.rdfq;

      if (rdfQuery) {
        url.searchParams.append('q', rdfQuery);
      }

      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
    } catch (e) {
      console.error('Érvénytelen URL formátum a konfigurációban');
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
  // DEBUG LOGOK
    console.log('Üzenet érkezett az iframe-ből!');
    console.log('Küldő origin:', event.origin);
    console.log('Konfigurált baseUrl:', this.baseUrl);
    console.log('Adat (payload):', event.data);

    // A leggyakoribb hiba: a baseUrl végén van / perjel, az origin végén pedig nincs (vagy fordítva)
    // Próbáljuk meg lazább ellenőrzéssel:
    if (this.baseUrl && !this.baseUrl.includes(event.origin)) {
      console.warn('Biztonsági hiba: Az origin nem egyezik!');
      return;
    }

    const { type, data } = event.data;

    if (type === 'SEARCH_CHANGE' && data) {
      console.log('URL frissítése erre:', data);
      this.updateHostUrl(data);
    }
  }

  private updateHostUrl(rdfqValue: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { rdfq: rdfqValue },
      queryParamsHandling: 'merge',
      replaceUrl: true, // Megakadályozza a böngésző előzmények teleszemetelését
    });
  }

  ngOnDestroy(): void {
    // Most már van mit lezárni a subs tömbben
    this.subs.forEach(s => s.unsubscribe());
  }
}
