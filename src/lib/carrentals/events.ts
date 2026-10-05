/** Lets the fleet showcase hand a chosen vehicle to the booking demo. */
export const SELECT_VEHICLE = "cr:select-vehicle";

export function selectVehicle(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_VEHICLE, { detail: id }));
}
