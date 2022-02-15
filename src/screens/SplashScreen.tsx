import React, {useCallback, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import {Style, Typography} from '../theme';
import {StackActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {RepositoryContext} from '../context/RepositoryContext';

const SplashScreen = () => {
  const navigation = useNavigation();

  const {initRepository} = useContext(RepositoryContext);

  useFocusEffect(
    useCallback(() => {
      initRepository();
      const navigationTimer = setTimeout(() => {
        navigation.dispatch(StackActions.replace('HomeScreen'));
      }, 1000);

      return (): void => clearTimeout(navigationTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  return (
    <Container>
      <Typography.H1>Github Explorer</Typography.H1>
      <Style.Box marginTop={16}>
        <Style.Box marginTop={12}>
          <ActivityIndicator size={'large'} />
        </Style.Box>
      </Style.Box>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
`;

export default SplashScreen;
