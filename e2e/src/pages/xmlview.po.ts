import { element, by, ElementFinder } from 'protractor';

export class XmlView {

    private readonly locators = {
        selected: by.css('.selected'),
        searchResult: by.css('.search-result'),
    };

    getSelection(): ElementFinder {
        return element(this.locators.selected);
    }

    async getSelectionText(): Promise<string> {
        const ret = await element(this.locators.selected).getText();
        return this.trim(ret);
    }

    getSelectionSearchResult(): ElementFinder {
        return this.getSelection().element(this.locators.searchResult);
    }

    async getSelectionSearchResultText():  Promise<string> {
        const ret = await this.getSelectionSearchResult().getText();
        return this.trim(ret);
    }

    private trim(str: string): string {
        return str.replace(/\s+/g, ' ').trim();
    }
}
