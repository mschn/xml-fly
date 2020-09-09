import { browser, by, element } from 'protractor';
import { Search } from './search.po';
import { XmlView } from './xmlview.po';

export class AppPage {

  private readonly locators = {
    xmlView: by.css('app-xml-view'),
    searchLink: by.css('btn-search'),
    collapse: by.css('btn-collapse')
  };

  async navigateTo(url: string): Promise<AppPage> {
    await browser.get(`/${url}`);
    return new AppPage();
  }

  async clickSearch() {
    await element(by.css('.btn-search')).click();
    return new Search();
  }

  async clickCollapse() {
    await element(by.css('.btn-collapse')).click();
  }

  async getXmlView(): Promise<XmlView> {
    await element(this.locators.xmlView);
    return new XmlView();
  }



}
