import React, { FC } from 'react';
import './Accommodation.css';
import { IAccommodation } from '../../App.store';


interface AccommodationProps {
  selectedAccommodation: IAccommodation | undefined;
}

const Accommodation: FC<AccommodationProps> = (accommodationProps: AccommodationProps) => (
  <div className="Accommodation" data-testid="Accommodation">
    Accommodation Component
    <p>{accommodationProps.selectedAccommodation?.name}</p>
    <p>{accommodationProps.selectedAccommodation?.maxCapacity}</p>
  </div>
);

export default Accommodation;
