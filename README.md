# VR-Chat Website

This repository contains the code for a fully functional real-time chat website. The website allows users to create accounts, log in, and engage in live conversations with other users.

## Features

- **User Authentication**: Users can join the chat by entering their username.
- **Real-Time Messaging**: Instant messaging functionality powered by Firebase Realtime Database.
- **User Search**: Search and find users to start a chat.
- **Message History**: Chats are stored, and users can view their conversation history.
- **Responsive Design**: The app is optimized for both desktop and mobile views.
- **Firebase Integration**: Uses Firebase for database, authentication, and real-time updates.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Realtime Database for message storage and real-time updates
- **Icons**: Font Awesome for the chat icons
- **Fonts**: Google Fonts (Roboto & Montserrat)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/vrchat.git
    cd vrchat
    ```

2. **Set up Firebase**:
    - Create a project on Firebase.
    - Enable Realtime Database in your Firebase project.
    - Copy your Firebase configuration from the Firebase Console.
    - Replace the Firebase configuration in the `index.js` file:
    ```js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

3. **Run the project**:  
   Open the `index.html` file in your browser to start the application.

## How It Works

### 1. Joining the Chat
- Users can join the chat by entering a username. The username is stored in Firebase, and the user is redirected to the chat page.

### 2. Real-Time Messaging
- Users can send and receive messages in real-time. The messages are stored in the Firebase Realtime Database and instantly appear on the recipient’s chat interface.

### 3. Search Functionality
- The user can search for others by typing in the search box, which filters the list of active users.

### 4. Private Conversations
- Each user chat is stored separately, allowing private, one-on-one conversations between users.

## Contributing

Contributions are welcome! If you'd like to improve the app or fix any issues, feel free to open a pull request or submit an issue.

---
