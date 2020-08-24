import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Routes from './src/Routes'
import {Auth} from './src/context/auth'


export default function App() {
  return (
    <Auth>
      <StatusBar style="light" />
      <Routes />
      
    </Auth>
  );
}

