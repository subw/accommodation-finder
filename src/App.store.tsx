import {create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

export interface AppState {
    location: string;
    updateLocation: (newLocation: string) => void;
}

export const useAppStore = create<AppState>( (set) => ({
    location: 'overview',
    updateLocation: (newLocation: string) => {return set({ location: newLocation })}
}));

export interface AccommodationProperties {
    art: number;
    haus_nr: string;
    ort: string;
    plaetze: number;
    strasse: string;
    traeger: string;
}

export interface AccommodationData {
    id: string;
    geometry: any;
    srsName: string;
    type: string;
    properties: AccommodationProperties;
}

export interface IAccommodation {
    id: string;
    name: string;
    maxCapacity: number;
    currentCapacity: number;
    selected: boolean;
    checkedIn: boolean;
    systemStatusText: string;
    tags: string[];
    address: string;
}

export interface AccommodationState {
    accommodations: IAccommodation[];
    lastFetchTime: number;
    getAccommodations: () => void;
    selectAccommodation: (id: string) => void;
    checkInAccommodation: () => Promise<void>;
    checkOutAccommodation: () => Promise<void>;
    updateSystemStatusText: (newText: string) => void;
    addTagToAccommodation: (newTag: string) => Promise<void>;
    resetSystemStatusTexts: () => void;
}

const mockAPICallPost = async (data: any, delay: number): Promise<any> => {
    // actual call would be something like
    // await axios.post('/api/check-in-out', data);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate an error condition
            const errorCondition = false; // Set to true to simulate an error
            if (errorCondition) {
                reject(new Error('API request failed'));
            } else {
                resolve(data);
            }
        }, delay);
      });
}

const fetchBaseDataFromAPI = async (): Promise<any> => {
    try {
        const response = await fetch('https://api.hamburg.de/datasets/v1/uebernachtungsangebote/collections/uebernachtungsangebote/items?limit=10&offset=0&bulk=false&f=json');
        const jsonData = await response.json();
        return jsonData.features;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export const useAccommodationStore = create<AccommodationState>()( devtools(persist((set, get) => ({
    accommodations: [],
    lastFetchTime: 0,
    getAccommodations: async () => {
        const currentTime = Date.now();
        const cachingDuration = 24 * 60 * 60 * 1000;
        const timeDiff = currentTime - get().lastFetchTime;

        if (timeDiff < cachingDuration) {
          return;
        }
        const baseData: AccommodationData[] = await fetchBaseDataFromAPI();
        // TODO: Fetch specific data from own API and merge with data from public API
            // get user data from own api. Looks like {user: {id: 1, checked-in: someAccommodationID}}
            // get accommodationData froom own api. Looks like {[{id: 1, currentCapacity: 20, tags: ['clean', 'understaffed']}]}
        set({ accommodations: baseData.map((accomodationData: AccommodationData) => {
            return {
                id: accomodationData.id,
                name: accomodationData.properties.traeger, 
                maxCapacity: accomodationData.properties.plaetze, 
                currentCapacity: accomodationData.properties.plaetze, 
                selected: false, 
                checkedIn: false, 
                systemStatusText: '',
                address: accomodationData.properties.strasse + ' ' + accomodationData.properties.haus_nr + ' ' + accomodationData.properties.ort,
                tags: ['unterstaffed', 'clean']}
        }),
        lastFetchTime: currentTime});
    },
    selectAccommodation: (id: string) => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                return {...accommodation, selected: accommodation.id === id ? true : false}
            })
        }))
    },
    checkInAccommodation: async () => {
        await mockAPICallPost({},500);
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                if (accommodation.selected) {
                    return {...accommodation, checkedIn: !accommodation.checkedIn, currentCapacity: accommodation.currentCapacity - 1}
                } else {
                    return {...accommodation, checkedIn: false}
                }
            })
        }));        
    },
    checkOutAccommodation: async () => {
        await mockAPICallPost({},500);
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                if (accommodation.selected) {
                    return {...accommodation, checkedIn: !accommodation.checkedIn, currentCapacity: accommodation.currentCapacity + 1}
                } else {
                    return accommodation
                }
            })
        }))
    },
    updateSystemStatusText: (newText: string) => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                if (accommodation.selected) {
                    return {...accommodation, systemStatusText: newText}
                } else {
                    return accommodation
                }
            })
        }))
    },
    resetSystemStatusTexts: () => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                return {...accommodation, systemStatusText: ''}
            })
        }))
    },
    addTagToAccommodation: async (newTag: string) => {
        await mockAPICallPost({},500);
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                if(accommodation.tags.includes(newTag)) {
                    throw new Error('This tag already exists.');
                };
                if (accommodation.selected) {
                    const updatedTags: string[] = accommodation.tags.splice(0);
                    updatedTags.push(newTag);
                    return {...accommodation, tags: updatedTags}
                } else {
                    return accommodation;
                }
            })
        }))
    }
}),
{
  name: 'accommodation-store',
  getStorage: () => localStorage,
})));