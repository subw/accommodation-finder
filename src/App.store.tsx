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
    selected: boolean;
}

export interface AccommodationState {
    accommodations: IAccommodation[];
    getAccommodations: () => void;
    selectAccommodation: (id: string) => void;
}

export const useAccommodationStore = create<AccommodationState>()( devtools((set) => ({
    accommodations: [],
    getAccommodations: () => {
        set({ accommodations: accommodationsData.map((accomodationData: AccommodationData) => { 
            return {...accomodationData, selected: false}
        })})
    },
    selectAccommodation: (id: string) => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                return {...accommodation, selected: accommodation.id === id ? true : false}
            })
        }))
    }
})));