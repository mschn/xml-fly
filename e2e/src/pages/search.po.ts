import { by, element } from 'protractor';

export class Search {
    
    private readonly locators = {
        input: by.css('.search-input'),
        search: by.css('.btn-dosearch'),
        results: by.css('.search-results'),
        next: by.css('.btn-next')
    };

    async search(str: string) {
        await element(this.locators.input).sendKeys(str);
        await element(this.locators.search).click();
    }
    
    async getSearchResults(): Promise<string> {
        return await element(this.locators.results).getText();
    }
    
    async next() {
        await element(this.locators.next).click();
    }
}