import create, { SetState, GetState } from 'zustand';

type AgencyInfoStore = {
    price: number;
    // increment: () => void;
};

export const useAgencyInfoStore = create<AgencyInfoStore>(
    (
        set: SetState<AgencyInfoStore>,
        get: GetState<AgencyInfoStore>
    ) => ({
        price: 1,
        // increment: (): void => {
        //     const { count } = get();
        //     set({ count: count + 1 });
        // }
    })
)
