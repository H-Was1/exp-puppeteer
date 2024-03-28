import { Request, Response } from "express";

const puppeteerExtra = require("puppeteer-extra");

export const scrapeAqi = async (req: Request, res: Response) => {
  const browser = await puppeteerExtra.launch({
    headless: true,
  });
  const Page = await browser.newPage();
  await Page.goto("https://www.google.com/");
  const selector = "div.uU7dJb";
  await Page.waitForSelector(selector);
  const Content = await Page.$eval(selector, (data: any) => data.innerText);
  await browser.close();
  return res.json({
    status: 200,
    country: Content,
  });
};
