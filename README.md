# 💎 Page Prism

## Introduction

Page Prism is a web application designed to help designers and developers collect and organize visual inspirations for their projects.

Projects might be something like a new website or new feature on a site.
Inspirations are content pulled from an existing webpage that has certain features that inspire the project.

### Key Features

- Create and manage design inspiration projects
- Capture screenshots of websites and save them as `inspirations`
- Organize inspirations within projects
- View and edit project and inspiration details

## Dependencies

- React 18
- TypeScript
- Vite
- CSS Modules
- React Router
- IndexedDB (via idb library)

## 🛠️ Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

1. **Node.js** (version 18.20.2)

   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (usually comes with Node.js)

   - Verify installation: `npm --version`

3. **Docker**
   - Download and install from [docker.com](https://www.docker.com/)
   - Verify installation: `docker --version`

### Page Prism Web app setup

1. Clone this repository or download the the code as a zip.

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

5. Run tests:

   ```
   npm test
   ```

   This will run all the tests in the project using Jest.

### LLM setup 🦙

1. Pull and run docker image

   - `docker pull ollama/ollama`
   - `docker run -it -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama`
   - `docker exec -it ollama ollama run tinyllama`

2. Test API server
   - `curl -v --location 'http://localhost:11434/api/generate' --header 'Content-Type: application/json' --data '{"model": "tinyllama","prompt": "why is the sky blue?", "stream": true}'`

## 📔 Additional Notes

- The project uses IndexedDB for local storage, simulating a backend database
- API calls can be mocked with artificial latency to simulate network requests

## 📔 Additional Setup

- **VS Code Extensions** (optional but recommended):

  - ESLint
  - Prettier

- **Environment Setup**:

  - This project uses Node.js version 18.20.2. To ensure you're using the correct version, you can use a version manager like `nvm` (Node Version Manager):
    ```
    nvm use
    ```
  - If you don't have `nvm` installed, you can get it from [here](https://github.com/nvm-sh/nvm).

- **Editor Configuration**:
  - The project includes a `.prettierrc` file for consistent code formatting. Make sure your editor is set up to use Prettier for formatting.
