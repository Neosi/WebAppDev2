# BSc (Hons.) Level 8 - Assignment 1 - Single Page app.

Name: Max Larkin

## Overview.

An application made to create and store characters and their backgrounds quickly and efficiently. Characters are for use in tabletop RPG systems and the template is based upon Dungeons & Dragons 5e.

### Current Features

- Character builder
- Storage for created characters 
- Randomization options
- Extensible list of character options

### Upcoming Features

- Sorting options
- Group actions

## Setup.

### Dependancies
```
Python3
Node
```
### Setting up a virtual environment
From within /webappdev2 run:
```
python3 -m venv venv
```

### Activating the virtual python environment
Activate the virtual environment by navigating to the subdirectory containing the 'activate' script within your terminal.

This is usually found under /venv/Scripts on Windows or /venv/bin on Mac/Linux.

Once activated return to the root directory and run the following:
```
pip install -r requirements.txt
cd app
npm i
```
### Launching the app
Launching the app will require two terminals to launch both the front end and the back end.

Launch the server side from WebAppDev2/
```
python run.py
```
Launch the client side from WebAppDev2/app/
```
npm start
```
This will launch the app into a development environment.

## Data Model Design.

. . . . . A diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][model]

. . . Briefly explain any non-trivial aspects of the model . . . . .

~~~
place code snippets, e.g. JSON, inside these fence delimiters and they will appear in a block-like structure.
~~~
## UI Design.

. . . . . Screenshots of the app's views with brief statements of their use (see examples below) . . . . . . .

![][main]

>> Shows a card for each contact in the datastore. This contact list can be filtered by name and gender. A contact can be edited or deleted a contact. 

![][detail]

>> . . . bla bla bla . . . . . 

## Routing.

All routes are public for now.

- / - Home page.
- /builder - Main character building page.
- /characters - Displays list of all created characters.
- /character/:id - Detailed view of a specific character.
- /races - Displays list of all races.
- /class - Displays list of all classes.
- /personality - Displays list of all traits/ideals/bonds/flaws.

## Storybook.

. . . . . Include a screenshot of the fully expanded list of stories from the tool's UI (see below). Group the stories appropriately (e.g. Contact page group) . . . .

![][stories]

. . . . (Optional) State any non-standard Storybook add-ons used and include a screenshot(s) to illustrate.

## Backend.

The backend is built in Python in a simple flask application using the Object Relational Mapper (ORM) PonyORM. The application will create & initialise the database using sqlite3 which is native to python3. Flask routes all the necessary views through an API built on AJAX and REST principles providing full CRUD support.


## Independent learning.

. . . . . State any non-standard aspects of React or other related technologies that you researched and applied in this assignment, other than those covered by the two previous sections . . . . .

[model]: ./img/DataModel.PNG
[main]: ./img/main.png
[detail]: ./img/detail.png
[stories]: ./img/stories.png

