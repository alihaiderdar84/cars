# Car Rental System

A small backend car rental system built with Node.js, Express, SQLite, JWT authentication, and a CLI client.

The project started as a simple command-line tool and was upgraded into a database-backed REST API.

## Features

- Register and login users
- JWT-protected rental actions
- View all cars
- View a car by ID
- Rent a car
- Return a car
- CLI client for terminal usage
- SQLite database persistence

## Tech Stack

- Node.js
- Express
- SQLite
- bcrypt
- JSON Web Tokens

## Installation

```bash
npm install
```

Start the API server:

```bash
node server.js
```

Link the CLI globally:

```bash
npm link
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register a user |
| POST | `/login` | Login and receive JWT |
| GET | `/cars` | Get all cars |
| GET | `/cars/:id` | Get one car |
| POST | `/cars/rent` | Rent a car |
| POST | `/cars/return` | Return a car |

Protected routes require:

```txt
Authorization: Bearer <token>
```

## CLI Usage

After running `npm link`:

```bash
cars
```

Inside the CLI:

```bash
register
login
list
rent
return
logout
exit
```

The CLI communicates with the API, so the server must be running first.

## Project Structure

```txt
commands/
data/
db.js
services/
utils/
server.js
index.js
```

## Author

Ali Haider