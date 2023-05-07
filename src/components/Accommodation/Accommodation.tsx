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
      <li className="tag-item" key={tag}><p>{tag}</p>
      </li>
    );

  return (
  <div className="Accommodation" data-testid="Accommodation">
    <div className="accommodation-name">
    {accommodationProps.selectedAccommodation?.name}
    </div>
    <div className="accommodation-distance">
      {accommodationProps.selectedAccommodation?.currentCapacity} m entfernt
    </div>
    <div className="accommodation-occupancy">
      {accommodationProps.selectedAccommodation?.currentCapacity} von {accommodationProps.selectedAccommodation?.maxCapacity} Plätze frei
    </div>
    <div className="accommodation-address">
      {accommodationProps.selectedAccommodation?.address}
    </div>
    <div className="accommodation-tags">
      <ul className="tag-items">{tagItems}</ul>
      <form method="post" onSubmit={handleSubmit}>
        <label className="tag-adding">
          <input className="tag-input" name="newTagInput"></input>
          <button className="add-tag-button">+</button>
        </label>
      </form>
    </div>
    {accommodationProps.selectedAccommodation?.checkedIn 
      ? <button onClick={() => accommodationProps.onCheckOut()} className="check-in-out-button">Check-Out</button>
      : <button onClick={() => accommodationProps.onCheckIn()} className="check-in-out-button">Check-In</button>}
    <p>{accommodationProps.selectedAccommodation?.systemStatusText}</p>

  </div>
  )
};

export default Accommodation;
