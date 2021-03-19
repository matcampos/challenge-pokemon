import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    async changeLanguage(id: string) {
        await browser.wait(
            ExpectedConditions.presenceOf(element(by.css(`#${id}`))),
            5000
        );

        await element(by.css(`#${id}`)).click();
        return element(by.css(`#${id}`)).getAttribute('title') as Promise<string>;
    }
}
