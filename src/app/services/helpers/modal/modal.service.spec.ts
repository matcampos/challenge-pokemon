import { TestBed } from '@angular/core/testing';
import { Pokemon, Resistances } from 'src/app/models';

import { ModalService } from './modal.service';

describe('ModalService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ModalService = TestBed.get(ModalService);
        expect(service).toBeTruthy();
    });

    it('Open modal', () => {
        const service: ModalService = TestBed.get(ModalService);

        const pokemon = new Pokemon({
            id: 'aaaa',
            name: 'aaaa',
            resistances: new Array<Resistances>(
                new Resistances({
                    type: 'aaa',
                    value: 'aaaaaa'
                })
            )
        })

        const spy = spyOn(service, 'openModal')

        service.openModal(pokemon)

        expect(spy).toHaveBeenCalled();
    });
});
