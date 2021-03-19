import { PokemonsPage } from './pokemons.po';
import { browser, by, element, ExpectedConditions, logging } from 'protractor';

describe('workspace-project Pokemons', () => {
    let page: PokemonsPage;

    beforeEach(() => {
        page = new PokemonsPage();
    });

    it('Should change the search input value', async () => {
        page.navigateTo();

        await browser.wait(
            ExpectedConditions.presenceOf(element(by.css('#searchInput'))),
            5000
        );

        const result = await page.searchNewResults('pikachu');

        expect(result).toEqual('pikachu');
    });


    it('Should change the search input value and click on a pokemon card', async () => {
        page.navigateTo();

        await browser.wait(
            ExpectedConditions.presenceOf(element(by.css('#searchInput'))),
            5000
        );

        await browser.wait(ExpectedConditions.presenceOf(element(by.css('app-pokemon-card .card a'))),
            5000)

        await page.searchNewResults('pikachu');

        const {
            currentUrl,
            linkId
        } = await page.clickOnPokemonCard();

        expect(currentUrl).toEqual(linkId);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
