import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  NgZone,
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
import {
  APP_CONFIG,
  AppConfig,
} from 'src/config/app-config.interface';

@Component({
  selector: 'ds-graph-viewer',
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
  styleUrls: ['./graph-viewer.component.scss'],
})
export class GraphViewerComponent implements OnInit, OnDestroy {
  safeUrl: SafeResourceUrl;
  baseUrl: string;
  private lastQuery: string | undefined = undefined; // Undefined value for the initial state
  private subs: Subscription[] = [];

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.baseUrl = (this.appConfig as any)['graph-viewer']?.url;

    if (this.baseUrl) {
      this.subs.push(
        this.route.queryParams.subscribe((params) => {
          const currentQ = params.q || ''; // Normalize to empty string if missing

          // Trigger build only if it's the first load OR an external change (e.g. Back button)
          if (this.lastQuery === undefined || currentQ !== this.lastQuery) {
            // console.log('Iframe source update required');
            this.lastQuery = currentQ;
            this.buildSafeUrl(currentQ);
          }
        }),
      );
    }
  }

  /**
   * Builds the sanitized URL for the iframe.
   * @param q The query value to append
   */
  private buildSafeUrl(q?: string): void {
    if (!this.baseUrl) {return;}

    try {
      const url = new URL(this.baseUrl);
      const queryParam = q || this.route.snapshot.queryParams.q;

      if (queryParam) {
        url.searchParams.append('q', queryParam);
      }

      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
    } catch (e) {
      // console.error('Invalid URL format');
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (!event.data || typeof event.data !== 'object' || !event.data.type) {return;}
    if (this.baseUrl && !this.baseUrl.startsWith(event.origin)) {return;}

    const { type, data } = event.data;

    if (type === 'SEARCH_CHANGE' && data) {
      let valueToNavigate = '';

      // Handle different data structures from React
      if (typeof data === 'object' && data.q && Array.isArray(data.q)) {
        valueToNavigate = data.q[0];
      } else if (typeof data === 'string') {
        valueToNavigate = data;
      }

      if (valueToNavigate) {
        // Block the next subscription-based reload
        this.lastQuery = valueToNavigate;

        this.zone.run(() => {
          this.updateHostUrl(valueToNavigate);
        });
      }
    }

    if (type === 'OPEN_URL' && data) {
      this.zone.run(() => {
        window.open(data, '_blank');
      });
    }
  }

  private updateHostUrl(qValue: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: qValue },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
