import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        localStorage.clear();
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Change Language', () => {
        localStorage.clear();
        Object.defineProperty(navigator, 'language', {
            get: function () { return 'en'; },
            configurable: true
        });
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        app.setLanguage('pt');

        fixture.detectChanges();

        expect(app.language).toEqual('pt');
    });


    it('Change Language to en', () => {
        localStorage.clear();
        Object.defineProperty(navigator, 'language', {
            get: function () { return 'pt'; },
            configurable: true
        });

        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        app.setLanguage('en');

        fixture.detectChanges();

        expect(app.language).toEqual('en');
    });
});
