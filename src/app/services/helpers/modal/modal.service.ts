import { Injectable, ApplicationRef, Injector, ComponentFactoryResolver, EmbeddedViewRef, Inject } from '@angular/core';
import { ModalComponent } from 'src/app/modules/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { ErrorModel, Pokemon } from 'src/app/models';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private router: Router
    ) { }

    openModal<T = any>(modalInfos: T) {

        const modal = this.document.querySelector('app-modal')

        if (!modal) {
            // 1. Create a component reference from the component 
            const componentRef = this.componentFactoryResolver
                .resolveComponentFactory(ModalComponent)
                .create(this.injector);

            // Realizing the type
            let type;

            if (modalInfos instanceof ErrorModel) {
                type = 'error'
            } else if (modalInfos instanceof Pokemon) {
                type = 'pokemon'
            }

            // Component Inputs
            componentRef.instance.modalInfos = modalInfos;
            componentRef.instance.type = type;

            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(componentRef.hostView);

            // 3. Get DOM element from component
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;

            // 4. Append DOM element to the body
            this.document.body.appendChild(domElem);


            componentRef.instance.closeModal.subscribe((evt) => {
                this.appRef.detachView(componentRef.hostView)
                if (evt.routerLink) {
                    this.router.navigate([evt.routerLink])
                }

                if (this.document.body.classList.contains('no-scroll')) {
                    this.document.body.classList.remove('no-scroll');
                    window.scrollTo(0, evt.scrollPosition)
                }
            })
        }

    }
}
