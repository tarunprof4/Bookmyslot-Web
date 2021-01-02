import { Time } from '@angular/common';

export class SlotDetails {
  id: string;
  title: string;
  timeZone: string;
  slotDate: Date;
  startTime: Time;
  endTime: Time;
}
