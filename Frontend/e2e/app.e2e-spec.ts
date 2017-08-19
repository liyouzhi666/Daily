import { DailyWebPage } from './app.po';

describe('daily-web App', () => {
  let page: DailyWebPage;

  beforeEach(() => {
    page = new DailyWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
