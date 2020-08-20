import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Routes from './src/Routes'
import Onboarding from './src/components/Onboarding' 


export default function App() {
  return (
    <>
      <StatusBar style="light" />
     {/*  <Routes /> */}
      <Onboarding />
    </>
  );
}

