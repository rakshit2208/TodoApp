import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Todo from './src/Todo';
import Home from './src/Home';
import SplashScreen from './src/SplashScreen';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      {/* <Todo/> */}
      <Home/>
      {/* <SplashScreen/> */}
    </SafeAreaView>
    
  );
};

export default App;
