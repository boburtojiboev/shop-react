import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectEventPage = (state: AppRootState) => state.eventPage;

export const retrieveTargetEvents = createSelector(
  selectEventPage,
  (EventPage) => EventPage.targetEvents
);
export const retrieveChosenEvent = createSelector(
  selectEventPage,
  (EventPage) => EventPage.chosenEvent
);
export const retrieveEventComment = createSelector(
  selectEventPage,
  (EventPage) => EventPage.eventComment
);
export const retrieveChosenShop = createSelector(
  selectEventPage,
  (EventPage) => EventPage.chosenShop
);

