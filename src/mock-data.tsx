export const accommodations: Accommodation[] = [{
    id: 'DE.HH.UP_UEBERNACHTUNGSANGEBOTE_15',
    name: 'Tagesaufenthalt Park-In Treffpunkt Billstedt -Beratungseinrichtung',
    maxCapacity: 70
}, {
    id: 'DE.HH.UP_UEBERNACHTUNGSANGEBOTE_11',
    name: 'Tagesaufenthaltsstätte ALIMAUS',
    maxCapacity: 50
}, {
    id: 'DE.HH.UP_UEBERNACHTUNGSANGEBOTE_2',
    name: 'Tagesaufenthalt Obdachlosen-Tagesstätte "Mahlzeit"',
    maxCapacity: 90
}]

export interface Accommodation {
    id: string;
    name: string;
    maxCapacity: number;
}