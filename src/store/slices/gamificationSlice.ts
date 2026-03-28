import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GamificationState {
  isRewardModalOpen: boolean;
  rewardEvent: string;
  rewardEventAmount: string;
  rewardWith: string;
  rewardWithAmount: string;
  isTimeBound: boolean;
  endDate: string;
  selectedTier: string;
  isTierModalOpen: boolean;
  postCount: string;
  postDuration: string;
  showToast: boolean;
}

const initialState: GamificationState = {
  isRewardModalOpen: false,
  rewardEvent: "",
  rewardEventAmount: "",
  rewardWith: "",
  rewardWithAmount: "",
  isTimeBound: false,
  endDate: "",
  selectedTier: "",
  isTierModalOpen: false,
  postCount: "",
  postDuration: "",
  showToast: false,
};

const gamificationSlice = createSlice({
  name: "gamification",
  initialState,
  reducers: {
    openRewardModal(state) {
      state.isRewardModalOpen = true;
    },
    closeRewardModal(state) {
      state.isRewardModalOpen = false;
      state.rewardEvent = "";
      state.rewardEventAmount = "";
      state.rewardWith = "";
      state.rewardWithAmount = "";
      state.isTimeBound = false;
      state.endDate = "";
      state.selectedTier = "";
      state.isTierModalOpen = false;
      state.postCount = "";
      state.postDuration = "";
    },
    setRewardEvent(state, action: PayloadAction<string>) {
      if (state.rewardEvent !== action.payload) {
        state.rewardEventAmount = "";
        state.postCount = "";
        state.postDuration = "";
      }
      state.rewardEvent = action.payload;
    },
    setRewardEventAmount(state, action: PayloadAction<string>) {
      state.rewardEventAmount = action.payload;
    },
    setRewardWith(state, action: PayloadAction<string>) {
      state.rewardWith = action.payload;
      state.rewardWithAmount = "";
    },
    setRewardWithAmount(state, action: PayloadAction<string>) {
      state.rewardWithAmount = action.payload;
    },
    setIsTimeBound(state, action: PayloadAction<boolean>) {
      state.isTimeBound = action.payload;
      if (!action.payload) state.endDate = "";
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    openTierModal(state) {
      state.isTierModalOpen = true;
    },
    closeTierModal(state) {
      state.isTierModalOpen = false;
    },
    setSelectedTier(state, action: PayloadAction<string>) {
      state.selectedTier = action.payload;
    },
    setPostCount(state, action: PayloadAction<string>) {
      state.postCount = action.payload;
    },
    setPostDuration(state, action: PayloadAction<string>) {
      state.postDuration = action.payload;
    },
    showToastMessage(state) {
      state.showToast = true;
    },
    hideToastMessage(state) {
      state.showToast = false;
    },
  },
});

export const {
  openRewardModal,
  closeRewardModal,
  setRewardEvent,
  setRewardEventAmount,
  setRewardWith,
  setIsTimeBound,
  setRewardWithAmount,
  setEndDate,
  openTierModal,
  closeTierModal,
  setSelectedTier,
  setPostCount,
  setPostDuration,
  showToastMessage,
  hideToastMessage,
} = gamificationSlice.actions;
export default gamificationSlice.reducer;
