import { AccommodationsProps } from "./App";
import { Accommodation } from "./mock-data";

const Overview: React.FC<AccommodationsProps> = (accommodationsProps: AccommodationsProps) => {

    const listItems = accommodationsProps.accommodations.map((accommodation: Accommodation) =>
        <li key={accommodation.id}>
          <p>
            <b>Name: </b>
            {accommodation.name}
          </p>
          <p>
            <b>Places available: </b>
            {accommodation.maxCapacity}
          </p>
        </li>
      );

    return (
        <ul>{listItems}</ul>
    );
  }
  
  export default Overview;