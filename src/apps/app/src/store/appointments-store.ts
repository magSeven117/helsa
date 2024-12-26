import { RowSelectionState, Updater } from '@tanstack/react-table';
import { create } from 'zustand';

interface AppointmentsStore {
  columns: any[];
  setColumns: (columns?: any[]) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  rowSelection: Record<string, boolean>;
}
export const useAppointmentStore = create<AppointmentsStore>()((set) => ({
  columns: [],
  rowSelection: {},
  setColumns: (columns) => set({ columns }),
  setRowSelection: (updater: Updater<RowSelectionState>) =>
    set((state) => {
      return {
        rowSelection: typeof updater === 'function' ? updater(state.rowSelection) : updater,
      };
    }),
}));
