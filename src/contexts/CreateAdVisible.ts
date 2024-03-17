import { createContext, Dispatch, SetStateAction } from 'react';

interface ICreateAdVisibleContext {
  createAdVisible: boolean;
  setCreateAdVisible: Dispatch<SetStateAction<boolean>>
}

export const CreateAdVisibleContext = createContext<ICreateAdVisibleContext>({createAdVisible: true, setCreateAdVisible: () => {}});