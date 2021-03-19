import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorModel } from 'src/app/models';
import { getLanguage } from 'src/app/utils/get-browser-language';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent<T = any> implements OnInit, OnDestroy {
    @Input() modalInfos: T;
    @Input() type: 'pokemon' | 'error';
    @Output() closeModal: EventEmitter<{ scrollPosition: number, routerLink: string }> = new EventEmitter<{ scrollPosition: number, routerLink: string }>();
    scrollPosition: number = 0;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private translate: TranslateService
    ) {
        this.setLanguage();
    }

    ngOnInit() {
        const top = (window.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
        this.scrollPosition = top;
        this.document.body.classList.add('no-scroll');
        this.document.body.scrollTop = this.scrollPosition;
    }

    close() {
        let route;

        if (this.modalInfos instanceof ErrorModel) {
            if (this.modalInfos.button && this.modalInfos.button.routerLink) {
                route = this.modalInfos.button.routerLink;
            }
        }
        this.closeModal.emit({
            scrollPosition: this.scrollPosition,
            routerLink: route
        })
    }

    private setLanguage() {
        const language = getLanguage();
        this.translate.setDefaultLang('pt');
        this.translate.use(language);
    }

    ngOnDestroy() {
        this.document.body.classList.remove('no-scroll');
        window.scrollTo(0, this.scrollPosition)
    }

}
