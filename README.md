<img src="public/assets/images/logo.png" width="300px">
<br>
<b>Send Messages, Not Metadata.</b>
<br>

## Getting Started

This project is built with [Next.js](https://nextjs.org/) , [Tailwind CSS](https://tailwindcss.com/) & [Contentful](https://www.contentful.com).

### Setup

- Signup for a free [Contentful](https://www.contentful.com/) account and create an organisation.
- Import our Content models and assets into your Contentful space. We have created some example content for you to use.
  - Add your `space ID` and `content management token` inside of [contentful/config.json](contentful/config.json)
  - Run this command inside the root of this project
  ```
    npx contentful space import --config contentful/config.json
  ```
  - For more information see [here](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)
- Create a `.env.local` file
  ```shell
  CONTENTFUL_SPACE_ID=************
  CONTENTFUL_ACCESS_TOKEN=*******************************************
  CONTENTFUL_PREVIEW_TOKEN=*******************************************
  CAMPAIGN_MONITOR_CLIENT_ID=********************************
  CAMPAIGN_MONITOR_API_KEY=********************************
  ************************************************************************************************************************
  CAMPAIGN_MONITOR_LIST_API_ID=********************************
  STAGING_SECRET=**********
  ```
  - You don't need to worry about Campaign Monitor keys unless you are interested in how we handle mailing list subscriptions.
- Install the depencencies
  ```bash
  yarn install
  ```
- Now you can run the development server:
  ```bash
  yarn dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Contentful Notes

- Use `Link Preview` and `Media` content models for embedding content into blog posts.
- If linking content that is on the site itself try to omit omit https://getsession.org.
  e.g. `https://getsession.org/blog/onion-requests-session-new-message-routing-solution/` => `/blog/onion-requests-session-new-message-routing-solution/`.
- To use <sup>superscript</sup>, <sub>subscript</sub>, ~~strikethroughs~~ or <span style="background-color: #3a3a3a; color: white;">style</span> <span style="color: #00f782;">text</span> use the `Markup` content model.

## Development Notes

- **Always** run `yarn run build && yarn run start` to see how the code works in a production environment before committing or pushing to the server.

- For staging environments use `build:staging` and `start:staging`. This updates the system environment variables, page metadata accordingly.

- For accessbility testing we use the [axe-react](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md) plugin.

- Uses [Headwind](https://github.com/heybourn/headwind) VSCode extension for sorting Tailwind classes.

- Uses [classnames](https://www.npmjs.com/package/classnames) to organise our classes into groups that combine at build time.

### Tailwind class structure

This helps with readability and is encouraged. More of a _guideline_.

#### React

```jsx
  <div className={classNames(
    "general classes here - colors, fonts, padding, margin etc",
    "responsive class changes should have it's own string md: lg: etc."
    "placeholder classes",
    "animations, transforms, effect",
    "pseudo classes i.e hover, focus, active, etc.",
    "toggling classes i.e. NavMenu isExpanded"
  )}></div>
```

#### CSS

```css
.custom-class {
  @apply general classes here - colors, fonts, padding, margin etc;
  @apply responsive class changes should have it's own string md: lg: etc.;
  @apply placeholder classes;
  @apply animations, transforms, effect;
  @apply pseudo classes i.e hover, focus, active, etc.;
  @apply toggling classes i.e. NavMenu isExpanded;
}
```

### Gotchas

- We can't use template literals with classes if we want to purge the CSS.
  - https://github.com/tailwindlabs/tailwindcss/issues/2209#issuecomment-677855297
  - https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  - i.e. `hover:bg-black hover:text-${bgColor}` won't work in production.

## Attributions

‘Android robot head’ by Google available at https://commons.wikimedia.org/wiki/File:Android_robot_head.svg under a Creative Commons Attribution Generic 2.5. Full terms at https://creativecommons.org/licenses/by/2.5/deed.en.
