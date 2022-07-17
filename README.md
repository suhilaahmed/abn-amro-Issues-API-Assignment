
# Gitlab Issues API - Abn Amro Assignment
An API TypeScript testing framework for Gitlab Issues API (CRUD operations).
## Getting Started
These instructions will get you a copy of the framework up and running up and running on your local machine for testing process.

### Prerequisites

## Setting up you local environment
An IDE like VScode or WebStorm is preferable
After cloning the framework you will need to run the following steps:
In your local working directory:
### Install node modules
```
npm install
```
### Create an .env file in your local working directory
The .env file should contain the following paramters:
```
PRIVATE_ACCESS_TOKEN
GITLAB_USER_NAME
GITLAB_NAME
PROJECT_ID
```
The private access token can be found in your personal gitlab account.
The user name and the name are associated with you account.
The project Id is the Id the appears next to the project name on gitlab.

<img width="437" alt="Screenshot 2022-07-18 at 00 06 43" src="https://user-images.githubusercontent.com/9402421/179426619-02f15c92-9c50-49b3-8eda-e2c867f45f04.png">

### Run tests
After setting up you .env file, now you are ready to run the tests.
In the terminal of you IDE run the following command: 

```
npm run test
```

### Test report
After the test suite is fully executed in the terminal you will be able to view the result.
