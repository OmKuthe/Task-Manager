# Task Manager 📝

A full-stack Task Manager app that allows users to manage their tasks effectively. It includes user authentication, task categorization, and due dates. Built using the MERN stack (MongoDB, Express.js, React, Node.js) and JWT for authentication.

## 🚀 Features

- **User Authentication**: Secure login and signup using JWT (JSON Web Tokens).
- **Task Management**: Users can create, update, and delete tasks.
- **Task Categorization**: Tasks can be categorized as "Work" or "Personal."
- **Due Dates**: Tasks can be assigned due dates for better time management.
- **Responsive UI**: A clean, responsive user interface built with React and Tailwind CSS.

## 🔧 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (NoSQL)
- **Deployment**: (Your chosen deployment method)

## ⚡ How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/OmKuthe/Task-Manager.git
   cd Task-Manager
2.Install backend dependencies:

bash
Copy
cd backend
npm install
3.Install frontend dependencies:

bash
Copy
cd ../frontend
npm install
4.Set up environment variables:

In the backend folder, create a .env file and add your MongoDB URI and JWT secret key:
env
Copy
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:
bash
Copy
cd backend
npm start
Start the frontend server:
bash
Copy
cd ../frontend
npm start
Open your browser and go to http://localhost:3000 to access the app.

📌 Future Improvements
Task Priority: Allow users to prioritize tasks (e.g., Low, Medium, High).

Dark Mode: Add a dark mode for better user experience.

Notifications: Implement task reminders and notifications for due tasks.

Search & Filter: Add task search and filtering functionality.

🤝 Contributing
Contributions are welcome! If you have suggestions, feel free to open an issue or submit a pull request.

🔑 License
This project is licensed under the MIT License. See the LICENSE file for details.
