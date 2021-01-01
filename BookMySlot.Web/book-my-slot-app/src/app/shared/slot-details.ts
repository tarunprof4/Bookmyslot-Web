import { Time } from '@angular/common';

export class SlotDetails {
  id: string;
  title: string;
  createdBy: string;
  slotTimeZone: string;
  slotDate: Date;
  slotStartTime: Time;
  slotEndTime: Time;
}
