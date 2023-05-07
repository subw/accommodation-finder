import React, { FC } from 'react';
import './Overview.css';
import { IAccommodation } from '../../App.store';

interface OverviewProps {
  accommodations: IAccommodation[] | null;
  onButtonClick: any
}

//TODO: add proper distance
//TODO: add checkbox functionality

const Overview: FC<OverviewProps> = (overviewProps: OverviewProps) => {

    const listItems = overviewProps.accommodations?.map((accommodation: IAccommodation) =>
        <li className="list-entry" key={accommodation.id} onClick={() => overviewProps.onButtonClick(accommodation.id)}>
          <p className="entry-name">
            {accommodation.name}
          </p>
          <p className="entry-distance">
            {accommodation.maxCapacity}
          </p>
        </li>
      );
  
  return (
    <div className="Overview" data-testid="Overview">
      <div className="filter">
        <input className="checkbox" type="checkbox"></input>
        <label className="label">available</label>
      </div>
      <ul className="accommodations-list">
        <li className="header">
          <p className="header-name"><b>Name</b></p>
          <p className="header-distance"><b>Entfernung</b></p>
        </li>
        {listItems}
      </ul>
    </div>
  )
};

export default Overview;