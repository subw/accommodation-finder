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
    checkedIn: boolean;
    systemStatusText: string;
}

export interface AccommodationState {
    accommodations: IAccommodation[];
    getAccommodations: () => void;
    selectAccommodation: (id: string) => void;
    checkInAccommodation: () => void;
    checkOutAccommodation: () => void;
    updateSystemStatusText: (newText: string) => void;
    resetSystemStatusTexts: () => void;
}

export const useAccommodationStore = create<AccommodationState>()( devtools((set) => ({
    accommodations: [],
    getAccommodations: () => {
        set({ accommodations: accommodationsData.map((accomodationData: AccommodationData) => { 
            return {...accomodationData, selected: false, checkedIn: false, systemStatusText: ''}
        })})
    },
    selectAccommodation: (id: string) => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                return {...accommodation, selected: accommodation.id === id ? true : false}
            })
        }))
    },
    checkInAccommodation: () => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                if (accommodation.selected) {
                    return {...accommodation, checkedIn: !accommodation.checkedIn}
                } else {
                    return {...accommodation, checkedIn: false}
                }
            })
        }))
    },
    checkOutAccommodation: () => {
        set((state) => ({ accommodations: state.accommodations
            .map((accommodation: IAccommodation) => {
                return {...accommodation, checkedIn: false}
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
    }
})));