import { browser, by, element, ExpectedConditions } from 'protractor';

export class PokemonsPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    async searchNewResults(value: string) {
        const inputElement = element(by.css('#searchInput'));

        await inputElement.sendKeys(value);

        await browser.wait(ExpectedConditions.presenceOf(element(by.css('.card'))),
            5000)

        return inputElement.getAttribute('value');
    }

    async clickOnPokemonCard() {
        const aElement = element.all(by.css('app-pokemon-card .card a')).first();

        const linkId = await aElement.getAttribute('href');
        
        await aElement.click()

        const currentUrl = await browser.getCurrentUrl();

        return {
            currentUrl,
            linkId
        }
    }
}
