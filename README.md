


## 🚀 Getting Started

You will need to have in your local machine:

- [Node.js v20.9.0](https://nodejs.org/en/).
- [Git](https://git-scm.com/).
- [Docker and Docker Compose](https://www.docker.com/)

To run the project locally, you have to:

1. Clone this project:
```bash
git clone git@github.com:luisvidev/devtalles-competition-app.git
```

2. Rename .env.template file for .env .



3. Start the database from a container. Run the following command in the root folder:
```bash
docker compose up -d
```

3. Install dependencies:
```bash
npm install
```

4. Setup the database generating and applying migrations:
```bash
npx prisma migrate dev
```

5. Run the seeder script to populate the database with dummy data:
```bash
npm run seeder
```

6. Run The application
```bash
npm run dev
```
