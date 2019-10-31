# WebAppDev2
An application made to create and store characters and their backgrounds quickly and efficiently. Characters are for use in tabletop RPG systems and the template is based upon Dungeons & Dragons 5e.

## Dependancies
```
Python3
Node
```
## Setting up environment
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
## Launching the app
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
