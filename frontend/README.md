# My E-Learning App

This is an e-learning platform with an integrated IDE for coding education.

## Features

* **Courses:** Browse and enroll in a variety of courses.
* **Integrated IDE:** Write and execute code directly in the browser.
* **User Authentication:** Sign up and log in to your account.
* **Dashboard:** Track your progress and manage your courses.

## Getting Started

To get started with this project, you will need to have the following installed on your machine:

* **Node.js:** [https://nodejs.org/](https://nodejs.org/)
* **MongoDB:** [https://www.mongodb.com/](https://www.mongodb.com/)

Once you have these installed, you can follow these steps to get the project up and running:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/my-elearning-app.git
```

2. **Install the dependencies:**

```bash
cd my-elearning-app
npm install
```

3. **Create a `.env` file in the `backend/Mybackend` directory with the following content:**

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

4. **Start the development server:**

```bash
npm run dev
```

This will start the frontend and backend servers concurrently. You can then access the application at `http://localhost:3000`.

## Usage

To use the application, you will first need to sign up for an account. Once you have signed up, you can log in and start browsing the courses. When you find a course that you want to take, you can enroll in it and start learning.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.