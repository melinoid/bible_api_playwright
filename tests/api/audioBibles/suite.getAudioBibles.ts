import { APIResponse } from '@playwright/test';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';
import { audioBible } from '../../../utils/config';

const apiPath = '/v1/audio-bibles';
let response: APIResponse;

test.describe('/v1/audio-bibles', async () => {
  test('200 code (w/o params)', async ({ request, helper }, testInfo) => {
    test.slow();
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200wop'], await response.json(), testInfo);
    });
  });

  test('200 code (params w/o id)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          language: 'ckb',
          name: 'Kurdi',
          abbreviation: 'KSS',
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200woid'], await response.json(), testInfo);
    });
  });

  test('200 code (multiple ids)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          'include-full-details': false,
          ids: `2ae5a4c1795742c9-01,${audioBible.id}`,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200mid'], await response.json(), testInfo);
    });
  });

  test('200 code (all params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          language: 'eng',
          abbreviation: 'WEB13',
          name: 'English Bible',
          ids: audioBible.id,
          'include-full-details': true,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200ap'], await response.json(), testInfo);
    });
  });

  test('400 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: { language: '' },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 400);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['400'], await response.json());
    });
  });

  test('401 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        headers: { 'api-key': '' },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 401);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['401'], await response.json());
    });
  });
});
