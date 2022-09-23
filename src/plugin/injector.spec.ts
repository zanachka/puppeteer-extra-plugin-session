import { Browser, launch, Page } from 'puppeteer';
import { SessionManager } from '../classes/session-manager';
import { TestBrowserExecutablePath } from '../constants/constants';
import { inject } from './injector';

let browser: Browser;
let page: Page;
beforeAll(async () => {
  browser = await launch({
    headless: true,
    executablePath: TestBrowserExecutablePath,
    args: ['--no-sandbox'],
  });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

it('can inject the SessionManager', async () => {
  const injected = inject(page);
  expect(injected.session).toBeInstanceOf(SessionManager);
});
