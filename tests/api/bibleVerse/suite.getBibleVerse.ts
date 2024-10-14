import { APIResponse } from '@playwright/test';
import { bible } from '../../../utils/config';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';

const apiPath = `/v1/bibles/${bible.id}/verses/`;
let response: APIResponse;

test.describe('/v1/bibles/bibleId/verses/verseId', async () => {
  test('200 code w/o params', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.verseId, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      // Caution, kludge. Come up with something normal here.
      // Let's agree that we only need static data, rewriting dynamic data and discard meta.
      helper.compareResponseText(expBody['200wop'], (await response.json())['data']);
    });
  });

  test('200 code with html & alternate params', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.verseId, {
        params: {
          'content-type': 'html',
          'include-notes': true,
          'include-chapter-numbers': true,
          'include-verse-spans': true,
          parallels: bible.book.parallelId,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      // Caution, kludge. Come up with something normal here.
      // Let's agree that we only need static data, rewriting dynamic data and discard meta.
      helper.compareResponseText(expBody['200html'], (await response.json())['data']);
    });
  });

  test('200 code with json & reverse alternate params', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.verseId, {
        params: {
          'content-type': 'json',
          'include-titles': true,
          'include-verse-numbers': true,
          'use-org-id': true,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      // Caution, kludge. Come up with something normal here.
      // Let's agree that we only need static data, rewriting dynamic data and discard meta.
      helper.compareResponseText(expBody['200json'], (await response.json())['data']);
    });
  });

  test('200 code with text & all params', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.verseId, {
        params: {
          'content-type': 'text',
          'include-notes': true,
          'include-titles': true,
          'include-chapter-numbers': true,
          'include-verse-numbers': true,
          'include-verse-spans': true,
          'use-org-id': true,
          parallels: bible.book.parallelId,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      // Caution, kludge. Come up with something normal here.
      // Let's agree that we only need static data, rewriting dynamic data and discard meta.
      helper.compareResponseText(expBody['200text'], (await response.json())['data']);
    });
  });

  test('400 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.chapterId, {});
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
      response = await request.get(apiPath + '1', {
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

  test('403 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get('/v1/bibles/1/verses/1', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 403);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['403'], await response.json());
    });
  });

  test('404 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + 'GE1.1.1', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 404);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['404'], await response.json());
    });
  });
});
