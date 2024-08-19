import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Todo from './src/Todo';
import Home from './src/Home';
import SplashScreen from './src/SplashScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();


const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name='SplashScreen'component={SplashScreen}/>
    //     <Stack.Screen name='Home'component={Home}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      {/* <Todo/> */}
      <Home/>
      {/* <SplashScreen/> */}
    </SafeAreaView>
    
  );
};

export default App;
