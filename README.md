Open your terminal and navigate to the desired directory where you want to clone the repository, then run:

git clone <repository-url>

2. Install Dependencies

After cloning the repository, navigate to both the client and server directories to install the necessary dependencies.

    For the server:

cd server
npm install

For the client:

    cd client
    npm install

3. Database Configuration

After installing the dependencies, set up your database configuration:

    Rename the environment file:
        Copy the example .env file to .env in the server directory.
        Update the .env file with your database configuration.

4. Start the Application

Now, run the server and client:

    Start the server:

cd server
npm start

Start the client:

    cd client
    npm run dev

5. Run Database Migrations

To set up your database schema, execute the following migration command:

npx sequelize-cli db:migrate

6. Seed the Database

After migrating the database, you can seed it with the initial data:

npx sequelize-cli db:seed:all

7. Access the Application

Once everything is set up, you can access the app by opening your browser and going to the following URL:

http://localhost:5173/
8. Default User Credentials

By default, I've created three users. You can access the application with the following credentials:

    Username: john@example.com
    Password: password123