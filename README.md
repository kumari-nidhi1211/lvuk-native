# LeoVegasUK Native Candidate Task

This is a butchered version of an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Fire up the app for details of the test task 🦁

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Add the explaination of your changes here 🦁

## What I did

1. Fixed fetch bug:

- Added an empty dependency array to the initial data fetching useEffect to ensure the user list is fetched only once on the component mount. Previously, it fetched users on every render, causing unnecessary network requests and performance issues.

2. Optimized filtering:

- Removed the redundant API fetch on every search query change. Instead, all filtering happens locally on the already fetched user list, improving responsiveness and reducing network load.

3. Added memoization:

- Used useMemo to memoize filtered user results based on the current query and user list, preventing unnecessary recalculations and re-renders.

4. Wrap keyExtractor and renderItem in useCallback:

- To prevent unnecessary re-renders and improve performance, especially in large lists, wrap keyExtractor and renderItem functions with React's useCallback hook. This ensures stable references between renders and avoids unnecessary updates to the FlatList component.

5. Improved typing:

- Added TypeScript interface for users and typed React state to avoid type errors and improve code maintainability.

6. Enhanced UI/UX:

- Styled the search input and user list items for better usability and appearance:
- Added padding, border, and rounded corners to the input.
- I have added separator lines and padding to the list items for improved clarity and organization.
- Added (No users found) message when the search yields no results.
- Set helpful TextInput props like autoCorrect={false} and clearButtonMode.

6. Improved FlatList key usage:

- Used each user's unique ID as the FlatList key instead of the array index to avoid rendering issues.

## Why

- These changes collectively make the component more efficient, user-friendly, and maintainable:
- Reducing unnecessary fetch calls improves performance and reduces server load.
- Local filtering with memoization provides near-instant search results.
- Better styling improves the overall user experience.
- Correct typings prevent runtime errors and improve developer experience.

## Future Improvement

- We can add debounce to avoid re-rendering on every keystroke.
- Consider adding a KeyboardAvoidingView if this screen is likely to be used on smaller devices.

---
