1. **Difference between Component and PureComponent**
   - `Component` re-renders always if state or props change.
   - `PureComponent` does shallow compare on props and state. No re-render if no change in first level data.
   - **Break app example:** If data deep in an object changes, PureComponent won't catch it because shallow compare.

2. **Context + ShouldComponentUpdate issue**
   - `shouldComponentUpdate` not see context changes, only props and state.
   - **Why dangerous:** Can miss context updates, make component not update when should.

3. **Three ways to pass info to parent**
   - **Callback function:** Child calls function given by parent via props.
   - **Context:** Use React context to provide data up to parent.
   - **Custom events:** Child dispatches event that parent listens to.

4. **Two ways to prevent re-renders**
   - **React.memo:** Use for function components to prevent re-render if props the same.
   - **useMemo:** Use it to memoize values, prevent re-calculation and thus re-rendering.

5. **What is a fragment and why needed?**
   - **Fragments:** Group list of children without extra DOM nodes.
   - **Why needed:** Avoid extra wrapping divs, cleaner DOM.
   - **Break app example:** Using Fragment where a library expects a specific DOM structure could fail.

6. **Three examples of HOC pattern**
   - **withDataFetching:** HOC that fetches data and passes down as props.
   - **withAuthentication:** Wraps component, checks for auth, redirects if not.
   - **withLogging:** Logs component lifecycle events.

7. **Handling exceptions**
   - **Callbacks:** Check errors in first parameter.
   - **Promises:** Use `.catch()` to handle errors.
   - **Async/await:** Use try-catch blocks.

8. **Arguments for setState and why async**
   - Takes two arguments: new state value, and callback function for after update.
   - **Why async:** `setState` actions are batched for performance, not immediate.

9. **Migrate Class to Function Component**
   - Replace `this.state` with `useState`.
   - Use `useEffect` for lifecycle methods.
   - Replace methods with functions inside component or use `useCallback`.

10. **Ways to use styles in components**
    - **Inline styles:** Direct in style prop.
    - **CSS Modules:** Scoped to component.
    - **Styled-components:** Define styled components.

11. **Render HTML from server**
    - Use `dangerouslySetInnerHTML` prop to set HTML from server.
    - Example: `<div dangerouslySetInnerHTML={{ __html: serverHtmlString }} />`.

These answers short and might lack complete details, but cover basics.