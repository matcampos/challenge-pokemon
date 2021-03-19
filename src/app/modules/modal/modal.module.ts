import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/utils/http-loader-factory';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
    entryComponents: [ModalComponent],
    declarations: [ModalComponent],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
              },
            isolate: false
        }),
        RouterModule
    ],
    exports: [ModalComponent]
})
export class ModalModule { }
