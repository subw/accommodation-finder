import React, { FC } from 'react';
import './Accommodation.css';
import { AccommodationState, IAccommodation, useAccommodationStore } from '../../App.store';


interface AccommodationProps {
  selectedAccommodation: IAccommodation | undefined;
  onCheckIn: any;
  onCheckOut: any;
  addTag: any;
}

const Accommodation: FC<AccommodationProps> = (accommodationProps: AccommodationProps) => {

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    accommodationProps.addTag(formJson.newTagInput);
  }

    const tagItems = accommodationProps.selectedAccommodation?.tags.map((tag: string) =>
      <li key={tag}>{tag}
      </li>
    );

  return (
  <div className="Accommodation" data-testid="Accommodation">
    Accommodation Component
    <p>{accommodationProps.selectedAccommodation?.name}</p>
    <p>Anzahl Plätze gesamt: {accommodationProps.selectedAccommodation?.maxCapacity}</p>
    <p>Anzahl freie Plätze: {accommodationProps.selectedAccommodation?.currentCapacity}</p>
    {accommodationProps.selectedAccommodation?.checkedIn 
      ? <button onClick={() => accommodationProps.onCheckOut()}>Check-Out</button>
      : <button onClick={() => accommodationProps.onCheckIn()}>Check-In</button>}
    <p>{accommodationProps.selectedAccommodation?.systemStatusText}</p>
    <p>Tags:</p>
    <ul>{tagItems}</ul>
    <form method="post" onSubmit={handleSubmit}>
      <label>
        <input name="newTagInput"></input>
        <button>Add tag</button>
      </label>
    </form>
  </div>
  )
};

export default Accommodation;
