## URL

`​/v1​/bibles​/{bibleId}​/chapters​/{chapterId}`

## What is this for

Gets a single `Chapter` object for a given **bibleId** and **chapterId**.
This `Chapter` object also includes an content property with all verses for the `Chapter`.

## Request params

```ts
{
  'content-type'?: string; // html, json, text
  'include-notes'?: boolean;
  'include-titles'?: boolean;
  'include-chapter-numbers'?: boolean;
  'include-verse-numbers'?: boolean;
  'include-verse-spans'?: boolean;
  parallels?: string; // bibleIds, comma delimited
}
```

## Test Suite

Coming soon

#### Test: 200 code

| Action       | Expected result |
| ------------ | --------------- |
| Send request | get response    |

#### Test: 400 code

| Action       | Expected result |
| ------------ | --------------- |
| Send request | get response    |