regenerator-runtime is for transpiling async/await into ES5-compatible generator functions. 
But _Top-level await cannot be polyfilled._

components of any architecture
They include:
1. business logic
2. state
3. http library
4. application logic
5. presentation layer

### 1. business logic
This is any code that solves the actual business problem
It is directly rated to what the businss does and what it needs e.g sending messages, invoice generation etc

### 2. state
the app state is what stores all the data about the application's frontend
it should be the single source of truth
UI should be kept in sync with the state
it stores any data coming fron am API, user generated data

### 3. http library
this is responsible to http requesting and processing
it is almost always necessary in most web apps

## 4. application logic
this is the code that is concerned about the implementation of the app itself i.e the technical aspects of the app
it handles navigation and UI events
the sort of things that are unrelated to the business logic
this component is also called the router since it maps actions the the user's navigation

## 5. presentation layer
It is also called the UI layer and it is the visible part of the application
It is responsible for displaying the application state on the UI

Any good architecture has a way of separating all these components

## the MVC archtecture

### 1. Model
Handles all the applications data
usually contains the state and business logic that manipulates the state
it also contains the http logic that gets data from a server



### 2. View
For the presentation logic
part of the app interacting with the user


### 3. Controller
contains the application logic and sits between the model and the view
is is a bridge theween the model and view which should not directly interact
The main purpose of the MVC is to separate business logic from appli cation logic with controller being the bridge
it dispatches tasks to the model and the view
It is only the controller that imports and executes functions the model and the view; never the other way around

### event handling in MVC
The most common pattern for this is called the _publisher-subscriber pattern_

event listeners should be attached to DOM elements in the view module but the events should be handled by controller functions in the controller module






