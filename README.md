# BSc (Hons.) Level 8 - Assignment 1 - Single Page app.

Name: Max Larkin

## Overview.

An application made to create and store characters and their backgrounds quickly and efficiently. Characters are for use in tabletop RPG systems and the template is based upon Dungeons & Dragons 5e. It is built on a Nodejs frontend and a Python backend.

### Current Features

- Character builder
- Storage for created characters 
- Randomization options
- Extensible list of character options

## Setup.

### Dependancies
```
Python3
Node.js
```
### Setting up a virtual environment
From within /webappdev2 run:
```
python3 -m venv venv
```

### Activating the virtual python environment
To launch the python backend or install its requirements, the virtual environment will need to be activated. Activate the virtual environment by navigating to the subdirectory containing the 'activate' script within your terminal.

This is usually found under /venv/Scripts on Windows or /venv/bin on Mac/Linux.

### Package requirements

For the front end the requirements should be installed from WebDevApp2/app/:
```
npm i
```
For the back end the requirements should be installed while the venv has been activated from WebDevApp2/ via:
```
pip install -r requirements.txt

```
### Launching the app
Launching the app will require two terminals to launch both the front end and the back end.

Launch the server side from WebAppDev2/ with the venv activated.
```
python run.py
```
Launch the client side from WebAppDev2/app/
```
npm start
```
This will launch the app into a development environment.

## Data Model Design.

![][model]

The model is based around the character table which is the crux of the application. A character has entirely optional relationships with other entities in either one-to-many relationships or using a common many-to-many solution with composite keys.

## UI Design.

![][builder] 

>> This page allows characters to be created accessing all of the options available to it and randomly assigning personality options to them which may be refreshed.

![][characters]

>> This page shows all characters in the database in table form.

![][view]

>> This page shows a view of a specific character and their information.

![][races]

>> This page shows all races in the database in table form.

![][classes]

>> This page shows all classes in the database in table form.

![][personality]

>> This page shows all personality options in the database in table form.


## Routing.

All routes are public for now.

- /builder - Main character building page.
- /characters - Displays list of all created characters.
- /character/:id - Detailed view of a specific character.
- /races - Displays list of all races.
- /class - Displays list of all classes.
- /personality - Displays list of all traits/ideals/bonds/flaws.

## Storybook.

![][storybook]

## Backend.

The backend is built in Python in a simple flask application using the Object Relational Mapper (ORM) PonyORM. The application will create & initialise the database using sqlite3 which is native to python3. Flask routes all the necessary views through an API built on AJAX and REST principles providing full CRUD support.


## Independent learning.

Used many instances of props, state and component lifecycle to create reactive components.

[model]: ./images/DataModel.PNG
[builder]: ./images/builder.PNG
[characters]: ./images/characters.PNG
[races]: ./images/races.PNG
[classes]: ./images/classes.PNG
[personality]: ./images/personality.PNG
[view]: ./images/view.PNG
[storybook]: ./images/Storybook.PNG
