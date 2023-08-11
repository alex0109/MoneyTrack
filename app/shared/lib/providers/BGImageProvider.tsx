import React, { createContext, useCallback, useEffect, useState } from 'react';

import { get, save } from '../utils/asyncMethods';

import type { FC, ReactNode } from 'react';

interface BGImageContextType {
  imageName: string;
  imageIndex: number;
  // eslint-disable-next-line no-unused-vars
  changeImage: (newImage: string, newIndex: number) => void;
}

const defaultBGImageContext: BGImageContextType = {
  imageName: 'anim',
  imageIndex: 1,
  changeImage: () => {},
};

interface BGImageProviderProps {
  children: ReactNode;
}

const BGImageContext = createContext<BGImageContextType>(defaultBGImageContext);

const BGImageProvider: FC<BGImageProviderProps> = ({ children }) => {
  const [imageName, setImageName] = useState('anim');
  const [imageIndex, setImageIndex] = useState(1);

  const saveImageName = useCallback(async (imageValue: string) => {
    await save('Image', imageValue);
  }, []);

  const saveImageIndex = useCallback(async (index: number) => {
    await save('ImageIndex', String(index));
  }, []);

  const getImage = useCallback(async () => {
    const savedImageName = await get<string>('Image');
    const savedImageIndex = await get<string>('ImageIndex');
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

  const changeImage = useCallback(async (newTheme: string, newIndex: number) => {
    setImageName(newTheme);
    setImageIndex(newIndex);
    await saveImageName(newTheme);
    await saveImageIndex(newIndex);
  }, []);

  const value = {
    imageName,
    imageIndex,
    changeImage,
  };

  return <BGImageContext.Provider value={value}>{children}</BGImageContext.Provider>;
};

export { BGImageContext, BGImageProvider };
