import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    My React and TypeScript App!
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
