<p align="center">
  <img src="https://github.com/arenac/gympoint/blob/master/mobile/src/assets/logo.png" />
</p>


# Gympoint
Final project, Gympoint, of the Rocketseat GoStack 2019 course.

Gympoint is a complete solution including backend, website and mobile app for gym management. Through the website, academy administrators can register new students, plans, enrollments and respond to students' requests for help. The cell phone application is used by the student to perform checkins and send general questions related to the gym.
<br />After registering the student at the academy and creating the enrollment, he receives a confirmation email and welcome with information regarding the chosen plan and data of the student himself.
<br />**OBS: the mobile application was developed and tested only on the platform Android 9.0 (API 28)**

## Repository structure and prerequisites

The name of each folder explains the type of solution within this repository, backend, web and mobile. Each project has a specific configuration and will be detailed in sequence.

To run the backend it will be necessary to perform the following installations and setups:

* Create a docker instance for the database [postgres](https://hub.docker.com/_/postgres?tab=description) version 11 and redirect to port 5432
* Create a database within postgres
* Create a docker instance for the server [redis](https://hub.docker.com/_/redis/) alpine version with redirection to port 6379
* A Mailtrap or similar account to simulate an SMTP server
* A Sentry or similar account to log exceptions to the backend

### Backend

After cloning the repository, go to the backend folder and install the project's dependencies. Inside the backend folder create a file called **.env** and inside this file paste the contents of the file **.env.example**. Now assign the values of the variables DB_HOST, DB_USER, DB_PASS and DB_NAME for the postgres database.<br />
To simulate sending emails, fill in the variables MAIL_HOST, MAIL_PORT, MAIL_USER and MAIL_PASS referring to Sentry's SMTP credential.<br />
Finally add the Sentry URL for the client key for the project created in your account in the SENTRY_DSN environment variable.

Create the database tables

```yarn sequelize db:migrate```

Seed the tables

```yarn sequelize db:seed:all```

Then run the project

```yarn dev```

When accessing [http://localhost:4444/students/1/checkins](http://localhost:4444/students/1/checkins) the server must return status 200 with a response body in JSON format.

### Website

Inside the web folder, install the dependencies and run the command ```yarn start``` to emulate the site.<br/>
You can access the site by admin@gympoint.com and password 123456

### Mobile

Make sure the [React Native](https://facebook.github.io/react-native/docs/getting-started) be configured. 
Inside the mobile folder, install the dependencies and run the emualdor or physical device and run the command ```yarn android``` (considering you have your android mobile connected in you PC with the developer mode enabled)

## License

This project uses the MIT license - see the file [LICENSE.md](LICENSE.md) for more details.

## Thanks
To [Rocketseat](https://rocketseat.com.br/) for the knowledge acquired. <br />#BORACODAR
