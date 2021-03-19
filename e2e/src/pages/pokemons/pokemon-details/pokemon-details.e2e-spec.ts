import { PokemonDetailsPage } from './pokemon-details.po';
import { browser, by, element, ExpectedConditions, logging } from 'protractor';

describe('workspace-project Pokemons', () => {
    let page: PokemonDetailsPage;

    beforeEach(() => {
        page = new PokemonDetailsPage();
        browser.waitForAngular();
    });

    it('Should open attacks modal', async () => {
        page.navigateTo();

        expect(page.clickOnSeeAtacksButton()).toEqual(true);
    });

    it('Should enter in the details page and click on the back button to return to the main page', async () => {
        page.navigateTo();

        const baseUrl = browser.baseUrl;

        const currentUrl = await page.clickOnBackButton();

        expect(currentUrl).toEqual(baseUrl);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
