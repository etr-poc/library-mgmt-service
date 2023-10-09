# Library Management

This repository contains a book library application developed as part of a Technogise assignment. The application allows users to manage books in a library.

## Table of Contents

- [Assumptions](#assumptions)
- [Build Process](#build-process)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

## Assumptions

1. **Data Storage**: The application uses a MongoDB database to store and manage data. It connects to the database using a `mongoURI`.

2. **Application Flexibility**: The application is designed as an API application following the repository pattern for better code organization and maintainability.

## Build Process

The application is built with a focus on maintainability, reliability, and code quality. Here are some key aspects of the build process:

1. **TypeScript**: The application is developed using TypeScript to make the most of strong typing, which enhances code quality and provides better support in modern code editors.

2. **Unit Testing**: Unit tests are a critical part of the development process. The application uses Jest in combination with Sinon for unit testing to ensure the correctness of the code.

3. **Test-Driven Development (TDD)**: The application follows a Test-Driven Development (TDD) approach. This means that tests are written before the actual implementation of features. This practice helps catch bugs early and ensures that the code meets the specified requirements.

4. **Development Principles**: The application follows SOLID principles to promote modular and maintainable code. It also adheres to the KISS (Keep It Simple, Stupid) and DRY (Don't Repeat Yourself) principles for clean and efficient coding.

## Running the Application

To run the application locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.

2. **Install Dependencies**: Run `npm install` to install all the necessary dependencies required for the application.

3. **Database Configuration**: Ensure you have a MongoDB database running and provide the connection URI in your application configuration (usually a `.env` file).

4. **Launch the Application**: Start the application by running `npm run dev`. This will start the server locally.

5. **Run Unit Tests**: You can verify the functionality of the application by running `npm run test`. This will execute the unit tests and ensure that the application behaves as expected.

## Contributing

If you wish to contribute to this project, please follow the standard GitHub pull request process.
