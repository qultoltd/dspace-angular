import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeMetaService {

  getMetaContent(name: string): string | null {
    return document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? null;
  }
}
