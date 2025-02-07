# Employee Management System

# Objective

The goal of this project is to build a simple Employee Management System using React (TypeScript) for the frontend and Node.js with Express.js for the backend, storing data in a JSON file. The system allows users to add, view, update, and delete employees.

# Features

Home Page (Table View):

-Displays a list of employees.

-Each row includes employee details such as ID, Name, Department, and Contact information.

-Includes an "Edit" button in each row for inline editing of employee data.

-A modal pop-up allows users to add new employees.

-The modal contains input fields for all necessary employee details.

-"Save" and "Cancel" buttons to either save the new employee or close the modal without saving.

-Delete button to delete employee details

-Search employee bar to find employee names


# Technology Stack (Frontend)

React.js with TypeScript

Axios for API requests

Bootstrap 

# Backend (Node.js + Express.js)

RESTful API with the following endpoints:

POST /employees → Add a new employee

GET /employees → Retrieve all employees

PUT /employees/:id → Update an existing employee

Uses a JSON file (employees.json) for data storage instead of a database.

# Getting Started

Prerequisites

Ensure you have the following installed:

Node.js 

Yarn 

# Installation

Clone the repository:

git clone https://github.com/CriticThink/ems-curimatmat.git
cd ems-curimatmat

Install dependencies :
cd frontend
yarn install  

# Running the Application

Start the server:

cd to the root folder or ems-curimatmat
run in terminal: yarn dev

Open http://localhost:3000/ to view the app in your browser.

