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
  const checkInAccommodation = useAccommodationStore((state: AccommodationState) => state.checkInAccommodation)
  const checkOutAccommodation = useAccommodationStore((state: AccommodationState) => state.checkOutAccommodation)
  const updateSystemStatusText = useAccommodationStore((state: AccommodationState) => state.updateSystemStatusText)
  const resetSystemStatusText = useAccommodationStore((state: AccommodationState) => state.resetSystemStatusTexts)


  function handleAccommodationButtonClicked(id: string) {
    selectAccommodation(id);
    changeLocation('accommodation');
  }

  function handleCheckIn() {
    let currentlyCheckedInAccommodation: IAccommodation = accommodations.filter((accommodation: IAccommodation) => {
      return accommodation.checkedIn;
    })[0]
    if (currentlyCheckedInAccommodation !== undefined) {
      updateSystemStatusText('already checked in! Please check out of ' + currentlyCheckedInAccommodation.name + ' first.')
    } else {
      checkInAccommodation();
      updateSystemStatusText('successfully checked in');
    }
  }

  function handleCheckOut() {
    checkOutAccommodation();
    updateSystemStatusText('successfully checked out');
  }

  useEffect(() => {
    fetchAccommodations();
  },[])

  useEffect(() => {
    resetSystemStatusText();
  },[location])

  return (
    <div className="App">
      <button onClick={() => { changeLocation('overview') }}>home</button>
      {location === 'overview'
        ? <Overview accommodations={accommodations} onButtonClick={(id: string) => handleAccommodationButtonClicked(id)} />
        : <Accommodation 
            selectedAccommodation={accommodations.filter((accommodation: IAccommodation) => {
              return accommodation.selected;
            })[0]} 
            onCheckIn={() => handleCheckIn()}
            onCheckOut={() => handleCheckOut()}/>
      }
    </div>
  );
}

export default App;
