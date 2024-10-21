# todo.web -- Coder's Todo App

Hello and thank you for checking out my simple Todo App. This app allows you to create, delete and make todo's as completed. All you need to do (pun intended) is create an account and start making todo's.


## Overview
The `todo.web` repository is a simple web application built with React and TypeScript. It allows users to log in via AWS Cognito, create, manage, and update todo items. The application utilizes three contexts for managing state and WebSocket communication.

### Key Features
- Landing page with a welcome message
- User authentication using AWS Cognito
- Create, update, and manage todos in real-time via WebSocket

## Technologies Used
- React
- Matierial UI
- Fetch API
- TypeScript
- AWS Cognito for authentication
- Vite for development and build tooling

## Installation
To set up the `todo.web` application locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/coder755/todo.web.git
cd todo.web
```
2. Build:
```bash
nvm use
npm install
npm run dev:build
```
**Important**: You will also need to run the todo.users and todo.storage projects locally for the full application to function.

3. Run the application in development mode:
After running `npm run dev:build` once, you can run `npm run dev`

4. Open your browser and navigate to http://localhost:3000 (or the port specified in your terminal).


## Contexts
All state management is done with React.Context

### WebSocket Context
The WebSocket context is responsible for establishing a connection to the WebSocket server and handling messages sent and received in real-time. This allows for live updates to the todo list. Other contexts can subscribe to different events as they come in.

### User Context
The User context manages user data, including login and logout functionality. It interacts with AWS Cognito to authenticate users and store their access token. Once the token is retrieved, it is used in REST requests to get User and Todo information, and is sent across the Websocket to get live notifications.

### Todo Context
The Todo context handles all operations related to todos, including fetching, creating, updating, and deleting todos. It ensures that changes are reflected in real-time through the WebSocket connection.

## Scripts
The following scripts are available for managing the application:

- `dev`: Starts the development server with Vite.
- `dev:build`: Compiles the TypeScript code and builds the application for development.
- `build`: Compiles the TypeScript code and builds the application for production.
- `lint`: Runs ESLint to check for code quality and style issues.
- `preview`: Previews the built application locally.