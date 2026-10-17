# Disharmony Server

A Discord clone server built with NestJS, TypeScript, and Prisma.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL database

## Setup

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials

5. Generate Prisma client:
```bash
yarn prisma generate
```

6. Run database migrations:
```bash
yarn prisma migrate deploy
```

7. Start the development server:
```bash
yarn start:dev
```

## Available Scripts

- `yarn start` - Start the application
- `yarn start:dev` - Start the application in watch mode
- `yarn start:debug` - Start the application in debug mode
- `yarn start:prod` - Start the application in production mode
- `yarn build` - Build the application
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:migrate` - Run database migrations

## API Endpoints

### Users
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Servers
- `POST /servers` - Create a new server
- `GET /servers` - Get all servers
- `GET /servers/:id` - Get a specific server
- `PATCH /servers/:id` - Update a server
- `DELETE /servers/:id` - Delete a server
- `POST /servers/:id/members/:userId` - Add a member to a server
- `DELETE /servers/:id/members/:userId` - Remove a member from a server

### Rooms
- `POST /rooms` - Create a new room
- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get a specific room
- `PATCH /rooms/:id` - Update a room
- `DELETE /rooms/:id` - Delete a room
- `POST /rooms/:id/participants/:userId` - Add a participant to a room
- `DELETE /rooms/:id/participants/:userId` - Remove a participant from a room

### Messages
- `POST /messages` - Create a new message
- `GET /messages` - Get all messages
- `GET /messages/:id` - Get a specific message
- `GET /messages/room/:roomId` - Get all messages in a room
- `PATCH /messages/:id` - Update a message
- `DELETE /messages/:id` - Delete a message
