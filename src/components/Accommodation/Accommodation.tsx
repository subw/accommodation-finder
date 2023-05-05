import React, { FC } from 'react';
import './Accommodation.css';
import { AccommodationState, IAccommodation, useAccommodationStore } from '../../App.store';


interface AccommodationProps {
  selectedAccommodation: IAccommodation | undefined;
  onCheckIn: any;
  onCheckOut: any;
}

const Accommodation: FC<AccommodationProps> = (accommodationProps: AccommodationProps) => (
  <div className="Accommodation" data-testid="Accommodation">
    Accommodation Component
    <p>{accommodationProps.selectedAccommodation?.name}</p>
    <p>Anzahl Plätze gesamt: {accommodationProps.selectedAccommodation?.maxCapacity}</p>
    <p>Anzahl freie Plätze: {accommodationProps.selectedAccommodation?.currentCapacity}</p>
    {accommodationProps.selectedAccommodation?.checkedIn 
      ? <button onClick={() => accommodationProps.onCheckOut()}>Check-Out</button>
      : <button onClick={() => accommodationProps.onCheckIn()}>Check-In</button>}
    <p>{accommodationProps.selectedAccommodation?.systemStatusText}</p>
  </div>
);

export default Accommodation;
