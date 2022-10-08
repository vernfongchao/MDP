# Medical Dashboard Portal(MDP)

[MDP](https://mdp-application.herokuapp.com/) is a portal created for Hospital staff use. This app was tailored for ease of use and access for important hospital information consisting of patient and report information.

## Wiki

## [API Routes](https://github.com/vernfongchao/MDP/wiki/API-Routes)

API routes that will be used by our frontend server

## [Database Schema](https://github.com/vernfongchao/MDP/wiki/Database-Schema)

Schema of how MDP's database will be set up using PostgreSQL.

## [MVP Feature List](https://github.com/vernfongchao/MDP/wiki/MVP-Feature-List)

List of features needed for the Minimum Viable Product (MVP) and its CRUD features.

## Screenshots

### Announcement:

### Reports:

### Staff and Patients:

### Departments:

### Many to Many Relationships:

## Technical Difficulties

The most difficult challenge was finishing the Many to Many relationship feature. Because I wanted to the many to many relationships to be edited when a staff clicked on save, I had to keep in mind the current state so I can accurately pass in the correct data to my REST API to whether add or delete a relationship. Not only was this a challenge for the front-end but also the backend. I have to accurently parse the information making sure that the relationship must exist before deleteting and that the relationship must not exsist before deleting. I know there could be duplicates of relationships that can cause errors and break the server.

### Screenshots


## Features

- Full CRUD for Reports
- Full CRUD for Patients
- Full CRUD for Departments
- Full CRUD for Patients Emergency Contact
- Full CRUD for Many to Many relationships between, Reports, Patients, Departments, Staffs
- Setup AWS S3 to allow staffs to upload profile picture for themselves or patients.


### Future Features

- Canvas to allow highlight when hovering over department buildings

## Technologies Used

- React.js
- Python
- Flask
- Heroku
- Docker
- PostgreSQL
- AWS

## Local Installation

1. Clone this repo

   ```bash
   https://github.com/vernfongchao/MDP.git
   ```

2. Install dependencies for the back end

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Install dependencies for the react front end
   ```bash
   cd react-app
   npm install
   ```
4. Create PostgreSQL user

   ```bash
   CREATE USER mdp_app_dev WITH CREATEDB PASSWORD 'any_password'
   ```

5. Create PostgreSQL Database

   ```bash
   CREATE DATABASE mdp_app WITH OWNER dp_app_dev
   ```

6. Create a `.env` file in the root directory with the same variables as `.env.example` and change the value of DATABASE_URL and SECRET_KEY

   - Replace 'password' with any that you see fit and make sure its the same password when creating database User

   ```bash
   DATABASE_URL=postgresql://mdp_app_dev:any_password_here@localhost/mdp_app
   ```

   - Replace the value of SECRET_KEY to any secure encripted string of characters

   ```bash
   SECRET_KEY=Thisistotallynotawellkeptsecretkey,makesureyouchangeit
   ```

   -Go setup your AWS account and bucket (Please follow this [guide](https://github.com/jamesurobertson/aws-s3-pern-demo#create-your-aws-user-and-bucket) for setup)
   ``` bash
   S3_BUCKET='bucket name'
   S3_KEY='AWS User Key'
   S3_SECRET='Any secret key of your choosing'
   ```

7. Flask backend, Migrate, Upgrade, and Seed! In the root directory run

   ```bash
   pipenv shell
   flask db upgrade
   flask seedall
   ```

8. Start back end server while in root directory

   ```bash
   flask run
   ```

9. In a new terminal, enter react frontend directory and run

   ```bash
   npm start
   ```

10. If a new broswer tab does not open, navigate to `localhost:3000` in your browser

11. Start using Stay The Night!, Demo user is set up in the Login form. Please Enjoy!