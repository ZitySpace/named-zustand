# **React Component Library Template**
Template for developing react components. A `SimpleButton` component with `tailwindcss3` is implemented as an example.

# Deps
React + Typescript + Rollup + Jest + Storybook + Tailwind3 + PostCSS8 + Webpack5

# Setup
```bash
# clone the template
git clone git@github.com:ZitySpace/react-component-template.git ${YOUR_REACT_LIB_FOLDER}

# update `name` in `package.json`.
cd ${YOUR_REACT_LIB_FOLDER}

# install dependencies
yarn install

# remove storybook examples (optional)
rm -rf src/stories

```

# Implement
Implement custom components inside `src/components` folder.

# Test
```bash
yarn test
```

# Preview
```bash
# visit localhost:6006, should be able to see the styled component
yarn storybook
```

# Packaging
```bash
# package the lib inside dist folder, insert tailwind css (only for tags
# that are used in the library) in the head of packed library, you can
# find it in dist/*/index.js
yarn rollup
```

# Publish
1. Create `$REPO/.npmrc` file with content:

    ```plain
    registry=https://registry.npmjs.org/
    @ZitySpace:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=$GITHUB_PERSONAL_AUTH_TOKEN
    ```
    `@ZitySpace` scope refers to the prefix of package name in `package.json`.

2. Publish: `npm publish` or `yarn publish` will publish to github repo.


# Reference
## How to package
- [How to Create and Publish a React Component Library](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe)
- [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
- [Build a component library with React and TypeScript](https://blog.logrocket.com/build-component-library-react-typescript/)

## How to integrate tailwind
- [TailwindCSS with ReactJS](https://dev.to/hasibrashid/tailwindcss-with-reactjs-3ih9)
- [Building Component libraries with TSDX and Tailwind](https://frontend.blog/build-your-own-flexible-component-library-using-tsdx-typescript-tailwind-css-headless-ui/)
- [Bundle Stylesheets and Add LiveReload With Rollup](https://www.learnwithjason.dev/blog/learn-rollup-css)
- [Storybook + Tailwind 2 + PostCSS 8](https://github.com/wagerfield/storybook-tailwind)
