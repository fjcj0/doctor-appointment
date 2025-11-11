import { create } from 'zustand';
interface HeaderState {
    isHeaderSlideOpen: boolean;
    openHeaderSlide: () => void;
    closeHeaderSlide: () => void;
    toggleHeaderSlide: () => void;
}
const useHeaderStore = create<HeaderState>((set) => ({
    isHeaderSlideOpen: false,
    openHeaderSlide: () => set({ isHeaderSlideOpen: true }),
    closeHeaderSlide: () => set({ isHeaderSlideOpen: false }),
    toggleHeaderSlide: () =>
        set((state) => ({ isHeaderSlideOpen: !state.isHeaderSlideOpen })),
}));
export default useHeaderStore;