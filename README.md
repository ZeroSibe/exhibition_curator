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

## Prerequisites:

- Node.js v20.9.0
- Firebase Authentication and Firestore Database

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

- Create a Firebase project by following the setup guide [here](https://firebase.google.com/docs/web/setup)

- Enable Firebase Authentication (Email/Password).

- Set up a Firestore Database and create a collection named `Exhibitions`

5. Create the '.env.local' file within the root directory level and add the env variables:

Refer to the .env-example file for structure, and get your Firebase keys from your Firebase project settings.

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

```

6. Creating a Firestore Collection:

- Go to Firestore Database in the Firebase console and create a collection named `Exhibitions`.
- Ensure the collection has the necessary fields like `artworks`, `exhibition_name`, and `user_id`.
- Set up Firestore security rules, only registered users has read and write access for Exhibitions.

7. Preview in your browser:

```
npm run dev
```

Follow the link in your terminal.
