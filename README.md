# Exhibition Curator

## Hosted Site

https://2024-exhibition-curator.netlify.app

## About Exhibition Curator

Exhibition Curator is a place to build your own personal collection by browsing the two public art collections.

- There is currently two collections within the Exhibition Curator for users to browse through.
- Users can enter key terms which will
  provide them with a list of artworks to select from.
- After the user creates an account the selected artworks can then be added to a personalised exhibition
- When a user selects an artwork, more details of the artwork can be viewed, including a link to where the artwork is located.

## Project Set-Up:

To Run this project locally

1. Clone the repository:

```
git clone https://github.com/ZeroSibe/exhibition_curator.git
```

2. Navigate to the project directory you have cloned:

```
cd exhibition_curator
```

3. Install dependencies:

```
npm install
```

4. Create a Firebase project:

- register your web-app within firebase by following the firebase instructions [here](https://firebase.google.com/docs/web/setup)

- Once authentication is set by email and password, navigate to Firestore Database to open an 'Exhibitions' database.

5. Create the '.env.local' file within the root directory level and add the env variables:

Note: This can be found in your firebase project setting.

You can refer to '.env-example' file if you are not sure how to set the '.env.local' file.

```
VITE_FIREBASE_API_KEY=firebase_api_key_value

```

6. Preview in your browser:

```
npm run dev
```

Follow the link in your terminal.

Minimum version of Node required to run locally: v20.9.0
