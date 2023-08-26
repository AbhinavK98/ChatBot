import React from 'react';
import './App.css';
import ChatBot from './ChatBot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>iCPAQS ChatBot</h1>
      </header>
      <main className="App-main">
        <ChatBot />
      </main>
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} iCPAQS ChatBot</p>
      </footer>
    </div>
  );
}

export default App;
