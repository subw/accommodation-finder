import {create } from 'zustand';
import { AccommodationData, accommodationsData } from './assets/mock-data';
import { devtools, persist } from 'zustand/middleware'

export interface AppState {
    location: string;
    updateLocation: (newLocation: string) => void;
}

export const useAppStore = create<AppState>( (set) => ({
    location: 'overview',
    updateLocation: (newLocation: string) => {return set({ location: newLocation })}
}));

export interface IAccommodation {
    id: string;
    name: string;
    maxCapacity: number;
    currentCapacity: number;
    selected: boolean;
    checkedIn: boolean;
    systemStatusText: string;
    tags: string[];
}

export interface AccommodationState {
    accommodations: IAccommodation[];
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

export const useAccommodationStore = create<AccommodationState>()( devtools(persist((set) => ({
    accommodations: [],
    getAccommodations: () => {
        // TODO: Fetch data from actual API, not from mock
        // TODO: Fetch specific data from own API and merge with data from public API
        // get user data from own api. Looks like {user: {id: 1, checked-in: someAccommodationID}}
        // get accommodationData froom own api. Looks like {[{id: 1, currentCapacity: 20, tags: ['clean', 'understaffed']}]}
        set({ accommodations: accommodationsData.map((accomodationData: AccommodationData) => { 
            return {...accomodationData, currentCapacity: accomodationData.maxCapacity, selected: false, checkedIn: false, systemStatusText: '', tags: ['unterstaffed', 'clean']}
        })})
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