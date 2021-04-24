# Matcha

<p align="center">
  <img src="https://github.com/iljaSL/matcha/blob/master/images/landingPage.gif">
</p>

### What is this project about?

This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

- [Task](#task)
- [Tech stack](#tech-stack)
- [Functionality](#functionality)
- [Planning](#planning)
  - [Work breakdown](#work-breakdown)
- [Run locally](#run-locally)

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
- **Matching features:**
  - Multiple infinite scroll galleries with a list of suggestions that match his/her profile (recommended, online, popular, nearby).
  - Matching Alogrimth using scoring weights based on Chinese and Western horoscope compatibility, common tags, fame rating, location, age and gender.
  - Advanced range sliders to sort and filter users by horoscope believe, common tags, location, fame rating and age.
- **Chat features:**
  - Real-time chat for matched users.
- **Notifications features:**
  - Real-time push notifications when the user receives a like/unlike, message from another user or user's profile is checked.

## Planning and Work breakdown

We outined our work load inside Github Projects [Link](https://github.com/iljaSL/matcha/projects/1).

