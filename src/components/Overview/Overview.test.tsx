import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Overview from './Overview';

describe('<Overview />', () => {

  function handleAccommodationButtonClicked() {
    let state = {location: 'accommodation'};
  }

  test('it should mount', () => {
    render(<Overview accommodations={null} onButtonClick={() => handleAccommodationButtonClicked()}/>);
    
    const overview = screen.getByTestId('Overview');

    expect(overview).toBeInTheDocument();
  });
});