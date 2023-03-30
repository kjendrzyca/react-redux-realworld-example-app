# Open-world refactoring kata

## Todo

* [ ] Open an editor or prepare a piece of paper for taking notes
* [ ] Follow the hints 💡 **only** if the instruction says so explicitly

Bonus points for applying standard cleaning methods: segregate imports, destructure props, add missing prop types.

Using prop types: https://legacy.reactjs.org/docs/typechecking-with-proptypes.html

## Exercise 1 - Extract Home feature folder

Goal: the goal of this and the few following exercises is to clean up the code by extracting feature folders.

It'll help us group features based on how we see them on the screen.

**Keep the reducers intact for now.**

## Exercise 2 - Extract Article feature folder

**Keep the reducers intact for now.**

## Exercise 3 - Extract Editor feature folder

**Keep the reducers intact for now.**

## Exercise 4 - Move the Article reducer to the Article feature folder

Goal: move the article reducer to where it belongs - to the Article feature.

Look for hints 💡 in `ArticleActions.js`, `Article/index.js`, `common.js` reducer.

1. Add `store` folder inside the Article feature
2. Add `actionTypes.js` to the `store` folder, extract actions that are used only in this feature from the common actions
3. Move `article.js` reducer to the `store` folder
4. Rename `DELETE_ARTICLE` action to `ROOT_REDIRECT`
5. Introduce generic `PAGE_UNLOADED` action in the `common.js` reducer

## Exercise 5 - Move the Editor reducer to the Editor feature folder

Goal: the same as above.

Look for hints 💡 in `Editor.js` and `editor.js` reducer.

1. Add `store` folder inside the Editor feature
2. Add `actionTypes` to the `store` folder, extract actions that are used only in this feature from the common actions
3. Move `editor.js` reducer to the `store` folder
4. Use common `PAGE_UNLOADED` action extracted before.

## Exercise 6 - Add `index.js` to the Article and Editor features

Goal: create a gateway - a public interface for each feature. This should be the only file that is imported in other parts of the application like router setup and so on.

1. Extract `Article.js` file and move the contents of `index.js` there.
2. Export `Article` component and reducer from the index file.
3. Add `index.js` file for Editor feature.
4. Export Editor component and reducer from the index file.

## Exercise 7 - Extract separate api for Home, Article and Editor features

Goal: segregate API interfaces for different features.

0. (optional) Rename `agent` to `api` because `agent` is a stupid name for an API module
1. You can try searching globally and see where the API methods are used (for example: search for "Articles.create")
2. If the API is used only in one feature then move it there
3. Do it only for Home, Article and Editor features
4. Do it in small parts, feature by feature

Attention: in some cases you will need to import two API files - one shared and one feature-specific.

## Exercise 8 - Add `Article.container`

Goal: clean up the `Article` component and remove all stuff related to Redux or api.

Inject stuff and see how to segregate responsibilities.

1. Create `Article.container.js` file and move all redux-related stuff there.
2. Pass necessary props .

(add prop-types)

## Exercise 9 - Add `Editor.container`

Goal: the same as above.

1. Create `Editor.container.js` file and move all redux-related stuff there.
2. Pass necessary props.

(add prop-types)

## Check how easy it was without hooks

https://github.com/kjendrzyca/react-redux-realworld-example-app/commit/67758931654709277084a4c2d370faac88172c59

## Exercise 10 - SLAP it - extract `ArticleBody` component

Change `eslintrc` config:

`"react/destructuring-assignment": "warn"`
`"react/prop-types": "warn"`

Goal: get rid of the `marked` dependency in the `Article` component and SLAP it a little bit more. This is just to show that those components can be really easy to read thanks to those small refactors.

1. Replace `<div dangerouslySetInnerHTML={markup}></div>` with `<ArticleBody body={article.body} />`

## Exercise 11 - Move `ArticleMeta` to shared components and inject `ArticleActions` with props

Goal: make a hole - a configuration prop that we will use to exercise OCP and use it later.

1. Move `ArticleMeta` to shared components
1. Look for hints 💡 in `ArticleMeta`

## Exercise 12 - Use `ArticleMeta` in `ArticlePreview`

Goal: make use of the configuration prop prepared in the previous exercise.

1. Use `ArticleMeta` in `ArticlePreview` component.
2. Look for hints 💡 there.

## Exercise 13 (optional) - Extract `FieldTab` component in `Home/MainView.js`

Goal: see how suprising it can be to extract generic components.

1. Look inside `MainView` component, there are 3 components there: `YourFeedTab`, `GlobalFeedTab`, `TagFilterTab`
2. Try to extract a generic `FeedTab` component for them
3. Would specialized component be useful?

## Exercise 14 - refactor Profile and ProfileFavorites

Goal: use composition instead of inheritance

Refactor renderTabs to a separate component (let components be components)

## Exercise 15 - Discussion: how would you extract `react-router-dom` module?

Is it worth it?

How would it look like?

## Exercise 16 - Refactor `Register` component to Hooks and create custom `useForm` hook

Goal: refactor component that keeps the local form state in Redux to a custom hook and local state.

1. Create custom `useForm` hook to keep the form state there
2. Get rid of redux calls to keep the form state in the store

Hint: you need to add `name` property to each form input.

This should be the hook interface:

```js
const {values, changeValue, submitForm} = useForm(onSubmit)
```

You can use this neat little trick and simulate `setState`:

```js
const [state, setState] = useReducer(
  (state, newState) => ({...state, ...newState}),
  {},
)
```

## Exercise 17 - Create `withProSubscriptionOnly` HoC

Goal: show that Hooks do not replace HoCs.

Use the HoC to show "favorite" button on article preview only if the user has pro subscription.

1. Extract `ArticlePreviewActions` component from `ArticlePreview`
2. Create `withProSubscriptionOnly` HoC that will be connected to Redux and will check if current user `isProUser`
3. The HoC will return `null` for `isProUser===false` and `WrappedComponent` otherwise
4. Wrap ArticlePreviewActions with HoC and simulate the change (by setting the `isProUser` flag in the reducer)
5. Discussion: why `withProSubscriptionOnly` is a HoC, wouldn't it be better if it was a Hook?

## Exercise 18 - refactor redux data fetching to tanstack-query or swr

Goal: see how it's done these days

## Bonus Exercise - Add `@testing-library/react` and test Article lifecycle

Goal: test cleaned up `Article` component, because it's extremely easy now.

1. Install @testing-library/react
2. Add test: `should display article on mount`
3. Write some other tests you think make sense

## Fin

Feel free to clean this mess up until you are bored.

See how clean can it get and compare with the initial repo.

Was it easy or tedious? That's why it's worth it to keep it clean from the beginning.
