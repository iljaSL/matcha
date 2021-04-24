# Matcha

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/landingPage.gif">
</p>

### What is this project about?

This is a team project, a part of the web branch at [Hive Helsinki](https://github.com/iljaSL/what_is_hive_helsinki) coding school.

- [Task](#task)
- [Tech stack](#tech-stack)
- [Functionality](#functionality)
- [Planning](#planning)
- [Run locally](#run-locally)
- [Improvements](#improvements)
- [Acknowledgements](#acknowledgements)

## Task

The aim of this project is to build a **Tinder-like web app**, where the users can create their profile, browse through a list of recommended profiles or conduct a search by age, distance, fame rating, commong tags. Users can like, report and block other users and chat with users that liked them back.

**Project constraints:**

- Clientside: HTML, CSS, Javascript
- Relational or graph-oriented database
- Micro-frameworks and UI libraries are allowed
- No ORM, validators, or User Account Manager
- No errors, warnings or notice on both server- and client- sides
- No security breaches (e.g. no SQL, HTML injections, plain passwords in the database)
- Compatible at least with Firefox (>=41) and Chrome (>= 46)
- Responsive design

## Stack

Backend:

- Node
- PostgreSQL
- Jest
- Socket.io

Frontend:

- React
- Redux
- Material UI

## Functionality

- **User features:**
  - Step-by-step registration, login, and password reset through email link.
  - User data management, incl. edit profile data, change password and geolocation.
  - View own and other user profiles.
  - View profile visit history, list of connected and blocked profiles.

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/matcha_signup.gif">
</p>

- **Matching features:**
  - Multiple infinite scroll galleries with a list of suggestions that match his/her profile (recommended, online, popular, nearby).
  - Matching Alogrimth using scoring weights based on Chinese and Western horoscope compatibility, common tags, fame rating, location, age and gender.
  - Advanced range sliders to sort and filter users by horoscope believe, common tags, location, fame rating and age.

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/matcha_gallery.gif">
</p>

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/matcha_filter.gif">
</p>

- **Chat features:**
  - Real-time chat for matched users.

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/matcha_messenger.gif">
</p>

- **Notifications features:**
  - Real-time push notifications when the user receives a like/unlike, message from another user or user's profile is checked.

## Planning

We outined our work load inside Github Projects [Link](https://github.com/iljaSL/matcha/projects/1).

## Run locally

- **Git clone** repo
- Install [PostgreSQL](https://www.postgresql.org/) and its [PostGIS](https://postgis.net/) extension
  `brew install postgresql postgis` or `apt install postgresql postgis`
- Make sure you can send email from terminal
- Install nodejs and npm `brew install nodejs npm` or `apt install nodejs`
- Create a file **.env** inside the `backend` folder and update with your credentials

```
PORT=3001
DB_USER=<YOUR_DB_USERNAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>
SECRET_KEY=<SECRET>
IMAGE_PATH=./images
```
- Run command `npm run init` in the matcha root folder to install all dependencies in the backend and frontend.
- Run command `npm run dev` to start a server and open `localhost:3001` in your preferred browser in dev mode.
- Run command `npm run db` to setup the database.
- Run command `npm run fake` to populate the database with fake users.
- Open Application in your favorite browser `localhost:3000`

## Improvements

- Deploying the app to Heroku
- Improving UI (the user profile and my account pages are not pretty at all, we needed to catch a deadline and rushed a bit through the UI dev process)
- Fixing exisitng bugs

## Acknowledgements

A big shout out to [Tatiana](https://github.com/T7Q) and [Diana](https://github.com/DianaMukaliyeva) for letting us use their readme template!
