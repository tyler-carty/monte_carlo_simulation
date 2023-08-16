
# Quantitative Risk Management System: Complete Environment Setup

Welcome to the Quantitative Risk Management System project! This README will guide you through the process of setting up your Python environment, Django API, and React frontend to ensure you have all the necessary dependencies in place.

## **1. Prerequisites**

Before we begin, ensure you have the following installed on your machine:

- Python (version 3.6 or higher)
- `pip` (Python package installer)
- `venv` (Python’s standard utility module)
- Node.js & npm (for React app setup)

## **2. Setting Up a Python Virtual Environment**

### a. Create a Virtual Environment

Navigate to the directory where you want to set up your project and run the following command:

`python3 -m venv project_env`

### b. Activate the Virtual Environment

- **On macOS and Linux:**

`source project_env/bin/activate`

- **On Windows:**

`project_env\Scripts\activate`

## **3. Installing Necessary Libraries**

With your virtual environment activated, run the following command:

`pip install yfinance pandas numpy django djangorestframework`

## **4. Starting the Django API**

Navigate to the `api` directory and run the following command to start the Django server:

`python manage.py runserver`

## **5. Setting Up the React App**

- Navigate to the `ui` directory

- Install Dependencies

`npm install`

- Start the React App

`npm start`

## **6. Deactivating the Virtual Environment**

Once done working, deactivate the virtual environment using:

`deactivate`

## **7. Re-activating the Virtual Environment**

When returning to work on this project, activate the virtual environment as specified in step 2b.

----------

This should provide you with a comprehensive guide to set up, run, and manage the project. Adjust the instructions as per your project's specifics, such as any other libraries or dependencies you decide to add later on.
