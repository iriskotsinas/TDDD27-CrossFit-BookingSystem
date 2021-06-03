# TDDD27 2021 Project

## Mid Course Screencast
[Press here to see our Mid Course Screencast](https://youtu.be/HxZI2T2IaQQ)
## Final Screencast
[Press here to see the Final Screencast](https://youtu.be/SEtRcUmYM6k)
## Individual Code Screencast
[Press here to see Viktor's Individual Code Screencast](https://youtu.be/kXMIoHArmZI)
## Functional specification
An application for bookings of training sessions, more specifically CrossFit. 

Some features are:
- Login
- Booking
- User profiles
- Admin page

### Login
A user should be able to create an account and login.

### Booking
A user should be able to book several training sessions, as well as cancel their registration.

### User profiles
A user should have access to a user profile containing personal information about booked sessions and user details. The user should be able to cancel sessions from the profile page.

### Admin page
The admin can add and delete sessions, as well as see who should attend the classes.

***

## Technological specification
The MEVN stack is used in this project. The frontend is developed in JavaScript and the backend is developed in TypeScript. The testing is performed with Jest.

### Frontend / Client framework
- Vue.js
- VueX
- SCSS

### Server framework / Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose

### Testing
- Postman
- Jest

***

## Run the application

To run the application, first clone or download the repo.

To start the frontend, run the following command in the ``frontend`` folder:

```
npm install
```

Then run the following command in the same folder:

```
npm run serve
```

To start the backend, run the following command in the ``backend`` folder:

```
npm install
```

Then run the following command in the same folder:

```
npm run dev
```

The frontend and backend should now be up and running, the the application can be seen at http://localhost:8080/.