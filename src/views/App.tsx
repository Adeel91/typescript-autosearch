import React from 'react';
import AutoCompleteSearch from '../components/autocomplete';
import './App.css';

export default function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Auto Complete Search (Typescript)</h2>
        <AutoCompleteSearch />
      </header>
    </div>
  );
}
