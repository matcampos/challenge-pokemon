import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() pokemon: Pokemon;
    @Output() closeModal: EventEmitter<{ scrollPosition: number }> = new EventEmitter<{ scrollPosition: number }>();
    scrollPosition: number = 0;

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        const top = (window.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
        this.scrollPosition = top;
        this.document.body.classList.add('no-scroll');
        this.document.body.scrollTop = this.scrollPosition;
    }

    close() {
        this.closeModal.emit({
            scrollPosition: this.scrollPosition
        })
    }

    ngOnDestroy() {
        this.document.body.classList.remove('no-scroll');
        window.scrollTo(0, this.scrollPosition)
    }

}
