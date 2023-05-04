import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Accommodation, accommodations } from './mock-data';
import Overview from './overview';

const App: any = () => {
  return (
    <div className="App">
      <Overview accommodations={accommodations} />
    </div>
  );
}

export default App;

export interface AccommodationsProps {
  accommodations: Accommodation[];
}
