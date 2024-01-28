# Research Project

## Installation Guide

### Obtaining OpenAI Secret Key

1. Go to https://platform.openai.com/docs/overview
2. Create an account or log in.
3. Click on the lock icon on the left, labeled "API Keys."
4. Click on "Create new secret key."
5. Optionally, you can give the secret key a name, but it is not necessary. Click on "create secret key."
6. **Important:** Click on "copy" now and save your secret key somewhere. Once you click on "done," it will no longer be possible to access the key.

### Project Installation

1. Clone the GitHub repository and open it in a code editor.
2. Open a terminal and ensure you are in the ResearchProject directory.
3. Install all the required packages:
    
    ```powershell
    npm i
    ```
    
4. Create a .env file in the main directory.
5. Place your secret API key in the file:
    
    ```powershell
    VITE_API_KEY=[secretApiKey]
    ```
    
6. Run the project.