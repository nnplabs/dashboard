# Near Notification Protocol Frontend

Welcome to the Near Notification Protocol Backend repository. The frontend dashboard is build in React.js(typescript). It allows dapps to easily get onboarded to our infrastructure without writing any code. It also provides them an interface to manage multiple events as well to send off-chain notifications.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Near Notification Protocol is an end-to-end notification architecture designed exclusively for dApps running on the Near Protocol. It offers a comprehensive solution for managing and sending notifications, enabling dApps to keep their users engaged and informed. The system is built with scalability and low-latency in mind, ensuring efficient delivery of notifications.

### Features

- **Multiple Notification Channels**: Near Notification Protocol supports various notification channels, including in-app notifications, Telegram, and email, with plans to add support for push notifications and webhooks in the near future.

- **User Analytics**: The backend manages user-related services, providing dApps with valuable insights into their users' behavior. This data helps dApps make informed decisions and tailor their notifications effectively.

- **On-Chain Event Integration**: The backend interacts with the parser service to retrieve on-chain events and process them, enhancing the quality and relevance of notifications.

## Getting Started

### Prerequisites

Before you can run this project, you need to have the following software installed:

- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation

1. Clone this repository to your local machine:

   ```bash
   https://github.com/nnplabs/dashboard.git

2. Navigate to the project directory:

   ```bash
   cd dashboard

3. Install the required dependencies:

   ```bash
   yarn install

5. Run the development server:
   ```bash
   yarn start
   ```
   
   Now, the Near Notification Protocol Frontend is up and running on your local environment.

## Project Structure
The project's source code is organized as follows:

```
- dashboard/  
  ─ public/ - Public assets
  ─ src/ - Source code
    ─ api/ - Directory for API-related code, which may include various API endpoints and related functions.
    ─ components/ - Houses reusable React components used across different parts of the app.
    ─ context/ - Contains context-related code, facilitating state management across the app.
    ─ hooks/ - Custom React hooks that help abstract and share logic within the components.
    ─ images/ - Stores images and assets used within the application.
    ─ mock/ - Contains mock data, useful for testing and development purposes.
    ─ pages/ - Holds React pages or views that represent different parts of application.
    ─ styles/ - Includes stylesheets and CSS files for styling.
    ─ types/ - Stores TypeScript type definitions for the project.
    ─ utils/ - Contains utility functions and modules used throughout the application.
    ─ App.tsx - The main application component that serves as the entry point for the React application.
    ─ Routes.tsx - Configures application routing, defining the routes available in the app.
    ─ constants.ts - Contains application constants and configuration settings.
    ─ custom.d.ts - Custom TypeScript definitions specific to the project.
    ─ index.tsx - The application entry point.
    ─ react-app-env.d.ts - Environment-specific TypeScript definitions.
  ─ .gitignore   
  ─ package.json 
  ─ README.md  
```

## Project Demo

Watch the demo of our project on [YouTube](https://youtu.be/EeZOyy3B3FM) to see the Near Notification Service in action. This video showcases the project's features and functionality.

## Devpost Submission

We have submitted this project to [Devpost](https://devpost.com/software/near-notification-service). You can check out our submission and learn more about the project's features, goals, and how it was built.


## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit and push your changes to your forked repository.
6. Submit a pull request, explaining your changes and why they should be merged.

Thank you for contributing!

## License
This project is licensed under the MIT License - see the LICENSE file for details.
