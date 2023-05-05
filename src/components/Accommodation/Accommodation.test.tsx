import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccommodationData from './Accommodation';
import Accommodation from './Accommodation';

describe('<Accommodation />', () => {
  test('it should mount', () => {
    render(<Accommodation selectedAccommodation={undefined} onCheckIn={null} onCheckOut={null}/>);
    
    const accommodation = screen.getByTestId('Accommodation');

    expect(accommodation).toBeInTheDocument();
  });
});