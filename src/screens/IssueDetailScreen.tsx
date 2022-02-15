import React, {useState} from 'react';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import {Layout, SafeAreaView, Style} from '../theme';
import {useRoute} from '@react-navigation/native';
import {AppBar} from '../components';
import {RootRouteProps} from '../../App';
import WebView from 'react-native-webview';

const IssueDetailScreen = () => {
  const route = useRoute<RootRouteProps<'IssueDetailScreen'>>();
  const [visible, setVisible] = useState(true);

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <AppBar.Basic title={'Issues Detail'} left={true} />
      <Style.Spacer width={Layout.width} height={2} backgroundColor={Colors.grey6} />
      <Container>
        <WebView originWhitelist={['*']} source={{uri: route.params.url}} onLoad={() => setVisible(false)} />
      </Container>
      {visible && <ProgressBar size={'large'} />}
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ProgressBar = styled.ActivityIndicator`
  position: absolute;
  top: ${Layout.height / 2}px;
  right: ${Layout.width / 2}px;
  bottom: ${Layout.height / 2}px;
  left: ${Layout.width / 2}px;
`;

export default IssueDetailScreen;
