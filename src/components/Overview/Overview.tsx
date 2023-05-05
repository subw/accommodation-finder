import React, { FC } from 'react';
import './Overview.css';
import { IAccommodation } from '../../App.store';

interface OverviewProps {
  accommodations: IAccommodation[] | null;
  onButtonClick: any
}

const Overview: FC<OverviewProps> = (overviewProps: OverviewProps) => {

    const listItems = overviewProps.accommodations?.map((accommodation: IAccommodation) =>
        <li key={accommodation.id}>
          <p>
            <b>Name: </b>
            {accommodation.name}
          </p>
          <p>
            <b>Places available: </b>
            {accommodation.maxCapacity}
          </p>
          <button onClick={() => overviewProps.onButtonClick(accommodation.id)}>view accommodation</button>
        </li>
      );
  
  return (
    <div className="Overview" data-testid="Overview">
      Overview Component
      <ul>{listItems}</ul>
    </div>
  )
};

export default Overview;