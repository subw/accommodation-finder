import './App.css';
import Overview from './components/Overview/Overview';
import Accommodation from './components/Accommodation/Accommodation';
import { AccommodationState, AppState, IAccommodation, useAccommodationStore, useAppStore } from './App.store';
import { useEffect } from 'react';

const App: any = () => {

  const location = useAppStore((state: AppState) => state.location);
  const changeLocation = useAppStore((state: AppState) => state.updateLocation);

  const accommodations = useAccommodationStore((state: AccommodationState) => state.accommodations);
  const fetchAccommodations = useAccommodationStore((state: AccommodationState) => state.getAccommodations)
  const selectAccommodation = useAccommodationStore((state: AccommodationState) => state.selectAccommodation)

  function handleAccommodationButtonClicked(id: string) {
    selectAccommodation(id);
    changeLocation('accommodation');
  }

  useEffect(() => {
    fetchAccommodations();
  },[])

  return (
    <div className="App">
      <button onClick={() => { changeLocation('overview') }}>home</button>
      {location === 'overview'
        ? <Overview accommodations={accommodations} onButtonClick={(id: string) => handleAccommodationButtonClicked(id)} />
        : <Accommodation selectedAccommodation={accommodations.filter((accommodation: IAccommodation) => {
          return accommodation.selected;
        })[0]}/>
      }
    </div>
  );
}

export default App;
