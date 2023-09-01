import React from 'react'; // imports the main React library
import ReactDOM from 'react-dom/client'; //imports a part of the react-dom package, responsible for rendering React components into the DOM (Document Object Model).
import './index.css'; //imports a CSS file named "index.css" 
import App from './App'; //imports the "App" component from "App.js"

/*
creates a "root" using the createRoot method from the react-dom package. 
The createRoot function is used for the new Concurrent Mode in React.
It takes an element (in this case, an element with the ID "root") as an argument and prepares it for rendering a React component.
*/
const root = ReactDOM.createRoot(document.getElementById('root'));

/*
renders a React component into the previously created root. 
The component being rendered is wrapped in <React.StrictMode>, 
which is a feature that helps highlight potential problems in your application during development. 
The component being rendered is the "App" component.
*/
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);