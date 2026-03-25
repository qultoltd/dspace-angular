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
      // Listen for URL parameter changes to update the iframe source
      this.subs.push(
        this.route.queryParams.subscribe(() => {
          this.buildSafeUrl();
        }),
      );
    }
  }

  /**
   * Builds the sanitized URL for the iframe based on the 'q' query parameter.
   */
  private buildSafeUrl(): void {
    if (!this.baseUrl) {
      return;
    }

    try {
      const url = new URL(this.baseUrl);
      const queryParam = this.route.snapshot.queryParams.q;

      if (queryParam) {
        url.searchParams.append('q', queryParam);
      }

      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
    } catch (e) {
      // console.error('Invalid URL format in configuration');
    }
  }

  /**
   * Listens for postMessage events from the embedded React application.
   */
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    // Basic security and type filtering
    if (!event.data || typeof event.data !== 'object' || !event.data.type) {
      return;
    }

    // Origin validation
    if (this.baseUrl && !this.baseUrl.startsWith(event.origin)) {
      return;
    }

    const { type, data } = event.data;

    // Handle search change event
    if (type === 'SEARCH_CHANGE' && data) {
      // Extract value: handle both string and { q: [string] } structures
      let valueToNavigate = '';
      if (typeof data === 'object' && data.q && Array.isArray(data.q)) {
        valueToNavigate = data.q[0];
      } else if (typeof data === 'string') {
        valueToNavigate = data;
      }

      if (valueToNavigate) {
        // console.log('Update URL with q:', valueToNavigate);
        this.zone.run(() => {
          this.updateHostUrl(valueToNavigate);
        });
      }
    }

    // Handle open record event
    if (type === 'OPEN_URL' && data) {
      // console.log('Opening record in new tab:', data);
      this.zone.run(() => {
        window.open(data, '_blank');
      });
    }
  }

  /**
   * Updates the DSpace URL query parameter without reloading the page.
   */
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
