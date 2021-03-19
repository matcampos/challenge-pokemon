import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('close modal', () => {
        const modalCloseDiv = fixture.nativeElement.querySelector('.modal-background');

        const spy = spyOn(component, 'close');

        modalCloseDiv.click();

        expect(spy).toHaveBeenCalled();

    })

});
