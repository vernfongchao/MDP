# Medical Dashboard Portal(MDP)
[MDP](https://mdp.onrender.com/) is a portal created for Hospital staff use. This app was tailored for ease of use and access for important hospital information consisting of patient and report information.

## Wiki

## [API Routes](https://github.com/vernfongchao/MDP/wiki/API-Routes)

API routes that will be used by our frontend server

## [Database Schema](https://github.com/vernfongchao/MDP/wiki/Database-Schema)

Schema of how MDP's database will be set up using PostgreSQL.

## [MVP Feature List](https://github.com/vernfongchao/MDP/wiki/MVP-Feature-List)

List of features needed for the Minimum Viable Product (MVP) and its CRUD features.

## Screenshots

[![Image from Gyazo](https://i.gyazo.com/5c059e368f9ce3c25610bb8360cbfb94.gif)](https://gyazo.com/5c059e368f9ce3c25610bb8360cbfb94)

### Announcement:

![image](https://user-images.githubusercontent.com/91238232/194731243-ac5afff2-2250-42a7-905c-e9e531472ba2.png)

### Reports:

![image](https://user-images.githubusercontent.com/91238232/194731248-e64b8d54-9ae1-4364-a5b9-db73368b53dc.png)

### Staff and Patients:

![image](https://user-images.githubusercontent.com/91238232/194731260-cdd7d174-fe4d-4202-92e9-dbaacc36d9c6.png)
![image](https://user-images.githubusercontent.com/91238232/194731271-c8e45a22-ad19-4025-8fb0-871124b8548c.png)

### Departments:

![image](https://user-images.githubusercontent.com/91238232/194731278-2860fe5d-8397-4d18-b0b4-54a70a87e2b0.png)

### Messages:
![image](https://user-images.githubusercontent.com/91238232/196009482-cd6d42e5-7e50-453c-8b5f-020a9ee825ce.png)


### Many to Many Relationships:

![image](https://user-images.githubusercontent.com/91238232/194731285-d349be31-3be8-43da-bb9e-ee864d791528.png)


## Technical Difficulties

The most difficult challenge was finishing the Many to Many relationship feature. Because I wanted many to many relationships to be edited when a staff clicked on save, I had to keep in mind the current state so I can accurately pass in the correct data to my REST API to whether add or delete a relationship. Not only was this a challenge for the front-end but also the backend. I have to accurently parse the information making sure that the relationship must exist before deleteting and that the relationship must not exsist before deleting. I know there could be duplicates of relationships that can cause errors and break the server.

### Screenshots

![image](https://user-images.githubusercontent.com/91238232/194731311-218e3988-9f09-4e59-99c8-be5d4e73a007.png)

![image](https://user-images.githubusercontent.com/91238232/194731334-fdc66d06-c5e6-4d84-9ba6-169c63143859.png)



## Features

- Full CRUD for Reports
- Full CRUD for Patients
- Full CRUD for Departments
- Full CRUD for Messages
- Full CRUD for Many to Many relationships between, Reports, Patients, Departments, Staffs
- Setup AWS S3 to allow staffs to upload profile picture for themselves or patients.
- Setup WebSockets to allow messaging between staff in real time.

### Future Features

- Canvas to allow highlight when hovering over department buildings

## Technologies Used

- React.js
- Python
- Flask
- Render
- Docker
- PostgreSQL
- AWS
- WebSocket

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

   - Go setup your AWS account and bucket (Please follow this [guide](https://github.com/jamesurobertson/aws-s3-pern-demo#create-your-aws-user-and-bucket) for setup)
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
