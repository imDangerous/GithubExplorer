import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type RepositorySaveResult = 'added' | 'deleted' | 'save-failed' | 'max' | 'exist' | 'not-exist' | null;

export type RepositorySaveData = {
  id: number;
  avatar_url: string;
  user: string;
  repo: string;
  description: string;
  favor: boolean;
};

interface RepositoryContextValue {
  starred: RepositorySaveData[];
  initRepository: () => void;
  clearRepository: () => void;
  addRepository: (data: RepositorySaveData) => Promise<RepositorySaveResult>;
  removeRepository: (data: RepositorySaveData) => Promise<RepositorySaveResult>;
}

const RepositoryContext = createContext<RepositoryContextValue>({
  starred: [],
  initRepository: () => {},
  clearRepository: () => {},
  addRepository: () => new Promise<RepositorySaveResult>(() => {}),
  removeRepository: () => new Promise<RepositorySaveResult>(() => {}),
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const RepositoryProvider = ({children}: Props): JSX.Element => {
  const [starred, setStarred] = useState<RepositorySaveData[]>([]);

  const saveStarred = async (data: RepositorySaveData[]) => {
    const repo = JSON.stringify(data);
    await AsyncStorage.setItem('repos', repo);
  };

  const initRepository = async () => {
    await AsyncStorage.getItem('repos').then((result) => {
      console.log('initRepository');
      if (result) {
        setStarred(JSON.parse(result));
      } else {
        setStarred([]);
      }
    });
  };

  const addRepository = async (data: RepositorySaveData): Promise<RepositorySaveResult> => {
    const exist = starred.find((old) => old.id === data.id);
    if (exist) {
      return new Promise<RepositorySaveResult>((resolve) => resolve('exist'));
    } else {
      if (starred.length >= 4) {
        return new Promise<RepositorySaveResult>((resolve) => resolve('max'));
      }

      try {
        const array = [...starred, data];
        setStarred(array);
        await saveStarred(array);
        return new Promise<RepositorySaveResult>((resolve) => resolve('added'));
      } catch (error) {
        console.log('err', error);
        return new Promise<RepositorySaveResult>((resolve) => resolve('save-failed'));
      }
    }
  };

  const removeRepository = async (data: RepositorySaveData): Promise<RepositorySaveResult> => {
    const exist = starred.find((old) => old.id === data.id);
    if (exist) {
      try {
        const array = starred.filter((old) => old.id !== data.id);
        setStarred([...array]);
        await saveStarred(array);
        return new Promise<RepositorySaveResult>((resolve) => resolve('deleted'));
      } catch (error) {
        console.log('err', error);
        return new Promise<RepositorySaveResult>((resolve) => resolve('save-failed'));
      }
    } else {
      return new Promise<RepositorySaveResult>((resolve) => resolve('not-exist'));
    }
  };

  const clearRepository = () => {
    AsyncStorage.setItem('repos', JSON.stringify([])).then(() => setStarred([]));
  };

  return (
    <RepositoryContext.Provider
      value={{
        starred,
        initRepository,
        addRepository,
        removeRepository,
        clearRepository,
      }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export {RepositoryContext, RepositoryProvider};
