import React, { createContext, useCallback, useEffect, useState } from 'react';

import { storage } from '../store/mmkv';

import type { FC, ReactNode } from 'react';

interface BGImageContextType {
  imageName: string;
  imageIndex: number;
  // eslint-disable-next-line no-unused-vars
  changeImage: (newImage: string, newIndex: number) => void;
}

const defaultBGImageContext: BGImageContextType = {
  imageName: 'none',
  imageIndex: 0,
  changeImage: () => {},
};

interface BGImageProviderProps {
  children: ReactNode;
}

const BGImageContext = createContext<BGImageContextType>(defaultBGImageContext);

const BGImageProvider: FC<BGImageProviderProps> = ({ children }) => {
  const [imageName, setImageName] = useState('none');
  const [imageIndex, setImageIndex] = useState(1);

  const saveImageName = useCallback((imageValue: string) => {
    storage.set('Image', imageValue);
  }, []);

  const saveImageIndex = useCallback((index: number) => {
    storage.set('ImageIndex', String(index));
  }, []);

  const getImage = useCallback(() => {
    const savedImageName = storage.getString('Image');
    const savedImageIndex = storage.getString('ImageIndex');
    if (savedImageName) {
      setImageName(savedImageName);
    }
    if (savedImageIndex) {
      setImageIndex(Number(savedImageIndex));
    }
  }, []);

  useEffect(() => {
    void getImage();
  }, [getImage]);

  const changeImage = useCallback((newTheme: string, newIndex: number) => {
    setImageName(newTheme);
    setImageIndex(newIndex);
    saveImageName(newTheme);
    saveImageIndex(newIndex);
  }, []);

  const value = {
    imageName,
    imageIndex,
    changeImage,
  };

  return <BGImageContext.Provider value={value}>{children}</BGImageContext.Provider>;
};

export { BGImageContext, BGImageProvider };
