import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}
  private currentLanguage = 'en';

  setCurrentLanguage(language: string): void {
    this.currentLanguage = language;
  }

  translate(key: string, params?: TranslateOptions): string {
    return this.i18n.translate(key, {
      lang: I18nContext.current().lang,
      ...params,
    });
  }
}
