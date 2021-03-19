import { browser, by, element, ExpectedConditions } from 'protractor';

export class PokemonDetailsPage {
    navigateTo(path: string = '') {
        return browser.get(`${browser.baseUrl}${path}`) as Promise<any>;
    }

    async clickOnSeeAtacksButton() {
        await browser.wait(ExpectedConditions.presenceOf(element(by.css('#searchInput'))),
        5000)

        const inputElement = element(by.css('#searchInput'));

        await inputElement.sendKeys("abomasnow");

        await browser.wait(ExpectedConditions.presenceOf(element(by.css('app-pokemon-card .card a'))),
            5000)

        const aElement = element.all(by.css('app-pokemon-card .card a')).first();

        await aElement.click();

        await browser.wait(
            ExpectedConditions.presenceOf(element(by.css('#openModalButton'))),
            5000
        );

        const button = await element(by.css('#openModalButton'));

        await button.click();

        const displayed = await element(by.css('app-modal .modal')).isDisplayed();

        return displayed;
    }

    async clickOnBackButton() {

        await browser.wait(ExpectedConditions.presenceOf(element(by.css('#searchInput'))),
        5000)

        const inputElement = element(by.css('#searchInput'));

        await inputElement.sendKeys("abomasnow");

        await browser.wait(ExpectedConditions.presenceOf(element(by.css('app-pokemon-card .card a'))),
            5000)

        const aElement = element.all(by.css('app-pokemon-card .card a')).first();

        await aElement.click();

        await browser.wait(
            ExpectedConditions.presenceOf(element(by.css('#backButton'))),
            5000
        );

        const button = await element(by.css('#backButton'));

        await button.click();

        return browser.getCurrentUrl()
    }
}
