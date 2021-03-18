import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';



@NgModule({
    entryComponents: [ModalComponent],
    declarations: [ModalComponent],
    imports: [
        CommonModule
    ],
    exports: [ModalComponent]
})
export class ModalModule { }
