import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>My React and TypeScript App!</h1>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
