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
  const addTagToAccommodation = useAccommodationStore((state: AccommodationState) => state.addTagToAccommodation)

  const updateSystemStatusText = useAccommodationStore((state: AccommodationState) => state.updateSystemStatusText)
  const resetSystemStatusText = useAccommodationStore((state: AccommodationState) => state.resetSystemStatusTexts)


  function handleAccommodationButtonClicked(id: string) {
    selectAccommodation(id);
    changeLocation('accommodation');
  }

  async function handleCheckIn() {
    let currentlyCheckedInAccommodation: IAccommodation = accommodations.filter((accommodation: IAccommodation) => {
      return accommodation.checkedIn;
    })[0]
    if (currentlyCheckedInAccommodation !== undefined) {
      updateSystemStatusText('already checked in! Please check out of ' + currentlyCheckedInAccommodation.name + ' first.')
    } else {
      try {
        await checkInAccommodation();
        updateSystemStatusText('successfully checked in');
      } catch (error) {
        updateSystemStatusText('there was a problem checking you in. Please try again later.');
      }
    }
  }

  async function handleCheckOut() {
    try {
      await checkOutAccommodation();
      updateSystemStatusText('successfully checked out');
    } catch (error) {
      updateSystemStatusText('there was a problem checking you out. Please try again later.');
    }
  }

  async function handleAddTag(newTag: string) {
    try {
      await addTagToAccommodation(newTag);
      updateSystemStatusText('successfully added a new tag');
    } catch (error: any) {
      updateSystemStatusText('Your tag was not added.' + error.message);
    }
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
            onCheckOut={() => handleCheckOut()}
            addTag={(newTag: string) => handleAddTag(newTag)}/>
      }
    </div>
  );
}

export default App;
