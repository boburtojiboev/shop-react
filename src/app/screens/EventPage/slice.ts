import { createSlice } from "@reduxjs/toolkit";
import { EventPageState } from "../../../types/screen";

const initialState: EventPageState = {
  targetEvents: [],
  chosenEvent: null,
  eventComment: [],
  chosenShop: null,
};

const eventPageSlice = createSlice({
  name: "eventPage",
  initialState,
  reducers: {
    setTargetEvents: (state, action) => {
      state.targetEvents = action.payload;
    },
    setChosenEvent: (state, action) => {
      state.chosenEvent = action.payload;
    },
    setEventComment: (state, action) => {
      state.eventComment = action.payload;
    },
    setChosenShop: (state, action) => {
      state.chosenShop = action.payload;
    },
  },
});

export const {
  setTargetEvents,
  setChosenEvent,
  setEventComment,
  setChosenShop,
} = eventPageSlice.actions;

const EventPageReducer = eventPageSlice.reducer;
export default EventPageReducer;
