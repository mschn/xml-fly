import { AppPage } from '../pages/app.po';
import { nikon_array_url } from '../data';

describe('workspace-project App', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('search and expand results', async () => {
    await page.navigateTo(nikon_array_url);
    const xmlView = await page.getXmlView();
    await page.clickCollapse();

    const search = await page.clickSearch();
    await search.search('nikon');
    expect(await search.getSearchResults()).toBe('Result 1 of 5');

    expect(await xmlView.getSelectionText()).toEqual('http://www.shopping.com/xCH-electronics-nikon~linkin_id-7000610?oq=nikon');
    expect(await xmlView.getSelectionSearchResultText()).toEqual('nikon');

    await search.next();
    await search.next();
    await search.next();

    expect(await xmlView.getSelectionText()).toEqual('<originalKeyword> nikon');
    expect(await xmlView.getSelectionSearchResultText()).toEqual('nikon');
  });
});
