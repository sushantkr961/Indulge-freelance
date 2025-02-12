export interface AddEventObject {
    title: string;
    remindMe?: number;
    reminderTime?: number;
    notes?: string;
    note?: string;
    date: string | Date,
    type?: string,
    mobile_no?: number | number[],
    time?: string,
    eventId?: number
}
export interface NewEventObject {
    // mobile_nos?: number[];
    reminderTime?: number;
    note?: string
}
export interface DeleteEventObject {
    mobile_no: number;
    eventId: number;
}