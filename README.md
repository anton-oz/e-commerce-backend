# E-Commerce Backend

## Description

I built out this backend so that the front end of an e-commerce website would be able to communicate with a postgres database via api routes. Through this backend you will be able to interact with data in a streamlined way through fetch requests on the client side. I learned a lot about error handling, and giving the user proper information about what went wrong with an http request.

## Installation

To get this project up and running you will need to have [postgres](https://www.postgresql.org/download/) and [node.js](https://nodejs.org/en/download/package-manager) installed. If you have both installed navigate to the root directory and enter `npm i` into the terminal to install dependencies. You will also need to create the database for the application. To do this enter `psql -U postgres` into the terminal and enter your password (replace postgres with your username if you have different login info). Once in psql, copy and paste the commands found in [schema.sql](./db/schema.sql) to the terminal to create ecommerce_db. Once the database is created enter `\q` to quit psql and enter `npm run seed` to seed the database (make sure you have created __.env__ file with correct login info for postgres). Thats all for installation!

## Usage

[Video Walkthrough](https://drive.google.com/file/d/1PNZz_61FGt3ZubQ-qrEyRrATAJ80OnXO/view?usp=sharing)

To run the app navigate to the root directory and enter `npm start` into the terminal. To test out the routes you will need an api client such as [Insomnia](https://insomnia.rest/download).

## Credits

N/A

## License

N/A
