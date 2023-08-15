# Quantitative Risk Management System: Python Environment Setup

Welcome to the Quantitative Risk Management System project! This README will guide you through the process of setting up your Python environment to ensure you have all the necessary dependencies in place.

## 1. **Prerequisites**

Before we begin, ensure you have the following installed on your machine:

- Python (version 3.6 or higher)
- `pip` (Python package installer)
- `venv` (Python’s standard utility module)

## 2. **Setting Up a Virtual Environment**

A virtual environment is a tool that helps to keep dependencies required by different projects separate by creating isolated environments for them. For this project, we'll be setting up a virtual environment to manage our dependencies.

**Step-by-step Guide:**

### a. Create a Virtual Environment

Navigate to the directory where you want to set up your project and run the following command:

bashCopy code

`python3 -m venv project_env`

This command will create a new directory named `project_env` in your project directory. Inside this folder, you'll find directories containing a copy of the Python interpreter, the standard library, and various supporting files.

### b. Activate the Virtual Environment

Once created, you'll need to activate the virtual environment. The command varies based on your operating system:

- **On macOS and Linux:**

bashCopy code

`source project_env/bin/activate`

- **On Windows:**

bashCopy code

`project_env\Scripts\activate`

When the virtual environment is activated, your shell's prompt will change, and it will show the name of the virtual environment, confirming that it's active. For our project, it should look something like this: `(project_env) Your-Computer:Your-Directory UserName$`

## 3. **Installing Necessary Libraries**

With your virtual environment activated, it's time to install the necessary libraries.

Run the following command:

bashCopy code

`pip install yfinance pandas numpy`

This command will install `yfinance` for data collection, `pandas` for data manipulation, and `numpy` for numerical computations.

## 4. **Deactivating the Virtual Environment**

Once you're done working on the project for the time being, you can deactivate the virtual environment and return to your global Python environment by simply running:

bashCopy code

`deactivate`

## 5. **Re-activating the Virtual Environment**

Remember, every time you come back to work on this project, you should activate the virtual environment using the activation command specified in step 2b. This ensures that you're always working with the right dependencies and in the right environment.
