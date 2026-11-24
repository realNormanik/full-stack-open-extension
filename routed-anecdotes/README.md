# Full Stack Open Extension - Routed Anecdotes

This project is the "Routed Anecdotes" application from the [Full Stack Open Extension](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-extension) course. The application shows a list of software anecdotes, lets users add new ones and delete existing ones, and uses [React Router](https://reactrouter.com/) for navigation. The main focus of the exercises is **custom hooks**: a reusable `useField` hook for form inputs and a `useAnecdotes` hook that encapsulates all the communication with the server. The data is stored in a JSON Server backend and fetched with the Fetch API, and the interface is styled with Tailwind CSS v4 with light and dark themes.

## 🗂️ Project Structure

The repository follows the layout required by the course, and the Routed Anecdotes application itself lives inside the `routed-anecdotes` folder:

```
routed-anecdotes/
├── api/
│   └── index.js
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── AnecdoteList.jsx
│   │   ├── CreateNew.jsx
│   │   ├── Footer.jsx
│   │   └── Menu.jsx
│   ├── hooks/
│   │   └── index.js
│   ├── services/
│   │   └── anecdotes.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── db.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

All course materials for the Routed Anecdotes exercises **1.** to **7.** are located inside the `routed-anecdotes` and `routed-anecdotes-tests` folders.

## ✅ Exercises Overview

During the development of the project in the Full Stack Open Extension, the following tasks were performed.

### 1: useField hook

- Wrote the `useField` custom hook in `src/hooks/index.js` as a named export. The hook manages the state of a single form input field and returns an object with the properties `type`, `value` and `onChange`.
- Used the hook in the anecdote creation form (`CreateNew.jsx`) for the `content`, `author` and `info` fields. The values are read with `content.value`, `author.value` and `info.value` when the form is submitted.

### 2: useField with reset

- Expanded the `useField` hook so that it exposes a `reset` function that clears the field value.
- Added a `reset` button to the form that clears all the input fields. The button has `type="button"`, so it does not submit the form.
- Passing the whole hook result to the input with the spread syntax caused the `Invalid value for prop 'reset' on <input> tag` warning in the console, which was fixed in the next exercise.

### 3: Fixing the spread issue

- The `<input {...content} />` expression also passed `reset` to the `<input>` element, which does not know such an attribute.
- Fixed it in the component with the rest syntax, so `reset` is separated from the props that belong to the input. The hook itself stays unchanged and the inputs are still written with the spread syntax:

```jsx
const { reset: resetContent, ...content } = useField("text");
const { reset: resetAuthor, ...author } = useField("text");
const { reset: resetInfo, ...info } = useField("text");

// ...

<input name="content" {...content} />
```

### 4: useAnecdotes, step 1

- Used the JSON Server that is already configured in the project. It is started with `npm run server` and exposes the anecdotes at `http://localhost:3001/anecdotes`.
- Implemented the `useAnecdotes` custom hook that encapsulates fetching the anecdotes with the `useState` and `useEffect` hooks and the `getAll` function from `services/anecdotes.js` (the service uses the Fetch API).
- At this step `App` used the hook with `const { anecdotes } = useAnecdotes()` and passed the anecdotes down to `AnecdoteList`, with a dummy `addAnecdote` function to keep the code from breaking.

### 5: useAnecdotes, step 2

- Extended the hook with the `addAnecdote` function that sends the new anecdote to the server with `createNew` and adds the anecdote returned by the server (with the `id` assigned by the server) to the local state.
- The hook is used as `const { anecdotes, addAnecdote } = useAnecdotes()`, and `App` passes `addAnecdote` to the `CreateNew` component instead of the dummy function.
- `CreateNew` waits for `addAnecdote` to finish before navigating to the list.

### 6: useAnecdotes, step 3

- Added the `deleteAnecdote` function to `services/anecdotes.js` (a `DELETE` request) and to the hook. It removes the anecdote from the server and then from the local state.
- Added a delete button next to each anecdote in `AnecdoteList`.
- Refactored the application so that neither the data nor the hook functions are passed down as props. `AnecdoteList` and `CreateNew` call `useAnecdotes` directly, and `App` only defines the layout and the routes.

### 7: Anecdotes checkup

- Ran the Playwright tests from the `routed-anecdotes-tests` folder against the application:

```bash
cd routed-anecdotes-tests
npm install
npx playwright install chromium
npm test
```

- Enabled the GitHub Actions workflow `.github/workflows/routed-anecdotes.yaml` so that the tests run on every push to `main`:

```yaml
name: routed anecdotes tests

on:
  push:
    branches: [main]
```

**Example hooks (simplified):**

```js
// hooks/index.js
export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdote) => {
    const created = await anecdoteService.createNew(anecdote);
    setAnecdotes((anecdotes) => anecdotes.concat(created));
  };

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteAnecdote(id);
    setAnecdotes((anecdotes) => anecdotes.filter((a) => a.id !== id));
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
};
```

**Example component logic (simplified):**

```jsx
const App = () => {
  return (
    <Router>
      <div className="shell">
        <header>
          <h1>Software anecdotes</h1>
          <Menu />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AnecdoteList />} />
            <Route path="/create" element={<CreateNew />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open-extension.git
```

2. Navigate to the application directory:

```bash
cd full-stack-open-extension/routed-anecdotes
```

3. Install the dependencies:

```bash
npm install
```

4. Start the JSON Server backend (it serves `db.json` at [http://localhost:3001/anecdotes](http://localhost:3001/anecdotes)):

```bash
npm run server
```

5. In a second terminal, start the development server:

```bash
npm run dev
```

The application is available at [http://localhost:5173](http://localhost:5173).

### Running the tests

The Playwright tests are located in the `routed-anecdotes-tests` folder. Start the backend and the development server first, then run:

```bash
cd routed-anecdotes-tests
npm install
npx playwright install chromium
npm test
```

## 🚀 Demo

You can view a working version of the project here:
👉 [Vercel](https://part7-routed-anecdotes.vercel.app/)

## 🧠 Notes

- `src/hooks/index.js` uses named exports, so the hooks are imported with `import { useField, useAnecdotes } from "../hooks"`. One module can hold several hooks.
- `useField` returns `type`, `value`, `onChange` and `reset`. The `reset` function is separated from the input props in the component, so the spread syntax `{...content}` still works and React does not warn about an unknown attribute on the `<input>` element.
- `useAnecdotes` keeps the anecdotes in local state. The state is updated with the response from the server (the `id` is assigned by the server) and with the functional form of `setAnecdotes`, so it never depends on an outdated value.
- Every call of `useAnecdotes` creates its own state, so `AnecdoteList` and `CreateNew` do not share the list. It works because `AnecdoteList` is mounted again every time the user goes back to `/` and fetches the data from the server, and because `CreateNew` waits for the `POST` request before navigating.
- The service in `services/anecdotes.js` uses the Fetch API instead of Axios and throws an error when the response is not `ok`. Errors are not handled in the components in these exercises.
- Styles are kept in `src/index.css`: design tokens in `@theme`, the dark theme via `prefers-color-scheme`, element styles in `@layer base` and reusable classes as `@utility` (for example `card`, `entry`, `chip`, `field`, `create`), so the components use only short class names. The fonts are Gabarito and Plus Jakarta Sans, loaded in `index.html`.
- Avoid committing the `node_modules` directory.