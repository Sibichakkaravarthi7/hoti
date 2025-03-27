import { Avatar, AvatarBadge, AvatarGroup, AvatarProps } from '@chakra-ui/react';
import React from 'react';

export type AppAvatarType = {
  size?: string;
  name: string;
  src: string;
  customStyles?: AvatarProps;
};

const AppAvatar: React.FC<AppAvatarType> = ({ size, name, src, customStyles }) => {
  return <Avatar size={size} name={name} src={src} {...customStyles} />;
};

export default AppAvatar;
