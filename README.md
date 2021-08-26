<img src="public/assets/images/logo.png" width="300px">
<br>
<b>Send Messages, Not Metadata.</b>
<br>

## Getting Started

This project is built with [Next.js](https://nextjs.org/) , [Tailwind CSS](https://tailwindcss.com/) & [Contentful](https://www.contentful.com).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Contentful Notes

- Use `Link Preview` and `Media` content models for embedding content into blog posts.
- If linking content that is on the site itself try to omit omit https://getsession.org.
  e.g. `https://getsession.org/blog/onion-requests-session-new-message-routing-solution/` => `/blog/onion-requests-session-new-message-routing-solution/`.
- To use <sup>superscript</sup>, <sub>subscript</sub>, ~~strikethroughs~~ or <span style="background-color: #3a3a3a; color: white;">style</span> <span style="color: #00f782;">text</span> use the `Markup` content model.

## Development Notes

- **Always** run `yarn run build && yarn run start` to see how the code works in a production environment before committing or pushing to the server.

- For staging environments use `build:staging` and `start:staging`. This updates the system environment variables, page metadata and shows content from Contentful that is not yet `live 🚀` .

- For accessbility testing we use the [axe-react](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md) plugin.

- Uses [Headwind](https://github.com/heybourn/headwind) VSCode extension for sorting Tailwind classes.

- Uses [classnames](https://www.npmjs.com/package/classnames) to organise our classes into groups that combine at build time.

- To work with any pages that use [Contentful](https://www.contentful.com) you will need to create your own free account and import our Contentful models.

  Email [will@oxen.io](mailto:will@oxen.io) for access to the content models. If there is enough interest they may be added to the repo in future.

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
