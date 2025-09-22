# E-Likita Backend

This is the backend for the E-Likita application.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Elmoustafi-22/e-likita-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Usage

To start the development server, run:

```sh
npm run dev
```

## Available Scripts

- `test`: Runs tests (currently not configured).
- `dev`: Starts the development server with `ts-node-dev`.
- `build`: Compiles the TypeScript code to JavaScript.
- `build:watch`: Watches for changes in TypeScript files and recompiles them.

## Dependencies

The project uses the following major dependencies:

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: For generating JSON Web Tokens
- `bcryptjs`: For hashing passwords
- And more...

See `package.json` for a full list of dependencies.
