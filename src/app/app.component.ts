import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitterHelper } from './utils/event-emitter';
import { getLanguage } from './utils/get-browser-language';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'pokemon-challenge';
    language: string = '';

    constructor() {
        this.language = getLanguage();
    }

    setLanguage(language: string) {
        localStorage.setItem('language', language);

        EventEmitterHelper.get('language').emit();

        this.language = language;
    }
}
