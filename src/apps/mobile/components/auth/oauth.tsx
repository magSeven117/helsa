import apple from '@/assets/icons/apple-logo.png';
import facebook from '@/assets/icons/facebook.png';
import google from '@/assets/icons/google.png';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export const GoogleOauth = () => {
  return (
    <TouchableOpacity style={{ borderRadius: 200, borderColor: '#262626', borderWidth: 1, padding: 10 }}>
      <Image source={google} style={{ height: 20, width: 20 }} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export const FacebookOauth = () => {
  return (
    <TouchableOpacity style={{ borderRadius: 200, borderColor: '#262626', borderWidth: 1, padding: 10 }}>
      <Image source={facebook} style={{ height: 20, width: 20 }} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export const AppleOauth = () => {
  return (
    <TouchableOpacity style={{ borderRadius: 200, borderColor: '#262626', borderWidth: 1, padding: 10 }}>
      <Image source={apple} style={{ height: 20, width: 20 }} resizeMode="contain" />
    </TouchableOpacity>
  );
};
