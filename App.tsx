import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import RepositoryScreen from './src/screens/RepositoryScreen';
import IssueScreen from './src/screens/IssuesScreen';
import IssueDetailScreen from './src/screens/IssueDetailScreen';
import {RepositoryProvider} from './src/context/RepositoryContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

enableScreens(true);

export type RootStackParams = {
  IssueScreen: {data: {id: number; user: string; repo: string}};
  IssueDetailScreen: {url: string};
};

export type RootRouteProps<RouteName extends keyof RootStackParams> = RouteProp<RootStackParams, RouteName>;

// Stack Navigation 설정
const Stack = createStackNavigator();

// React Query 전역 설정
const queryClient = new QueryClient();

// React Query Plugin 설정
if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent={true} animated={true} />
      <QueryClientProvider client={queryClient}>
        <RepositoryProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={'SplashScreen'}>
              <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
              <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
              <Stack.Screen name={'RepositoryScreen'} component={RepositoryScreen} />
              <Stack.Screen name={'IssueScreen'} component={IssueScreen} />
              <Stack.Screen name={'IssueDetailScreen'} component={IssueDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RepositoryProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
