import { ProfileSettings } from "./profile-settings";
import { SlotDetails } from "./slot-details";

export class BookedSlot {
  slotModel : SlotDetails
  createdByCustomerModel: ProfileSettings;
  bookedSlotModelInformation: string;
}
