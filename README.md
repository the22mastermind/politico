## Politico          [![Build Status](https://travis-ci.com/the22mastermind/politico.svg?branch=develop)](https://travis-ci.com/the22mastermind/politico)  [![Coverage Status](https://coveralls.io/repos/github/the22mastermind/politico/badge.svg?branch=ft-admin-create-party-162701470)](https://coveralls.io/github/the22mastermind/politico?branch=ft-admin-create-party-162701470)  [![Maintainability](https://api.codeclimate.com/v1/badges/77d12abbc0e6bb65dd35/maintainability)](https://codeclimate.com/github/the22mastermind/politico/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/77d12abbc0e6bb65dd35/test_coverage)](https://codeclimate.com/github/the22mastermind/politico/test_coverage)

### Overview
Politico enables citizens give their mandate to politicians running for different government offices 
while building trust in the process through transparency

### User Interface
[Politico](https://the22mastermind.github.io/politico-ui/)

### Hosted Application on heroku
[Politico](https://themastermind-politico.herokuapp.com/)

### Technologies Used
| Server     | Linting Library | Style Guide | Testing Framework |
| :--------- |:----------------| :-----------| :-----------------|
| * Node     | * ESLint        | * Airbnb    | * Mocha           |
| * Express  |                 |             |                   |

### API Endpoints
| Endpoint | Method                         | Description                                 |
| :--------| :------------------------------| :-------------------------------------------|
| POST     | `/users/auth/signup`           | Create a new user                           |
| POST     | `/users/auth/login`            | Login a new user                            |
| POST     | `/parties`                     | Create a political party                    |
| GET      | `/parties`                     | Fetch all political parties                 |
| GET      | `/parties/<party-id>`          | Fetch a specific political party            |
| PATCH    | `/parties/<party-id>`          | Edit the name of a specific political party |
| DELETE   | `/parties/<party-id>`          | Delete a specific political party           |
| POST     | `/offices`                     | Create a political office                   |
| GET      | `/offices`                     | Fetch all political offices                 |
| GET      | `/offices<office-id>`          | Fetch a specific political office           |
| POST     | `/offices<office-id>/register` | Register a candidate as a politician        |
| GET      | `/offices<office-id>/result`   | Fetch result of office after election       |
| POST     | `/votes`                       | Vote for a candidate                        |

### Getting Started
The instructions below will get you a copy of this project up and running on your local machine for development and testing purposes. See deployment for steps on how to deploy this project on a production system.

### Prerequisites
To be able to run this project on your local machine you need to install Nodejs along with npm.
Click [here](https://nodejs.org/en/download/) to download and install Nodejs.
Then open your terminal and run `npm install npm@latest -g` to install npm globally on your system.
To check if Nodejs and npm are installed, open your terminal and run `node -v && npm -v`.
It should display the version number you have installed. 

### Installation
1. Open your terminal and run `git clone https://github.com/the22mastermind/politico.git`. 
It should copy this project on your local system.
2. `cd politico` to cd into the project folder.
3. `npm install` to install the dependencies.

### Running the server and Tests
* `npm run dev` to start the server locally. It should display "Politico running on port #"
* `npm run test` to check if all the tests are passing.
It should display a list of all the tests and a test coverage summary table.

### Testing with POSTMAN
Postman is an API development environment used for creating and testing APIs by sending HTTP requests.
Click [here](https://www.getpostman.com/downloads/) to download and install POSTMAN.

After setting up POSTMAN, run it then make requests using the the API Endpoints table above.

Example of a request URL: GET `http://localhost:3000/api/v1/parties`

### Author
Bertrand 'The mastermind' Masabo

### Contributors
* Alex Mochu
* Harriet Ayugi

### References
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* https://www.w3schools.com
