import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import {Icons} from '../resources';
import {Typography} from '../theme';
import {IconButton} from './Button';

interface IBasicProps {
  title?: string;
  left?: boolean;
  onLeftPress?: () => void;
  right?: any;
  onRightPress?: () => void;
}

type AppBarStyle = {
  backgroundColor?: string;
};

type BasicProps = IBasicProps & AppBarStyle;

export const Basic: FC<BasicProps> = (props) => {
  const {title, left, onLeftPress, right, backgroundColor} = props;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Container backgroundColor={backgroundColor}>
      <Left>
        {left && <IconButton icon={Icons.backArrow} width={40} height={40} onPress={onLeftPress || goBack} />}
      </Left>
      <Center>
        <Typography.H4>{title}</Typography.H4>
      </Center>
      <Right>{right}</Right>
    </Container>
  );
};

export const Search: FC<BasicProps> = (props) => {
  const {title, left, onLeftPress, right, onRightPress, backgroundColor} = props;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const onSearch = () => {
    if (onRightPress) {
      onRightPress();
    }
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <Left>
        {left && <IconButton icon={Icons.backArrow} width={40} height={40} onPress={onLeftPress || goBack} />}
      </Left>
      <Center>
        <Typography.H4>{title}</Typography.H4>
      </Center>
      <Right>{right && <IconButton icon={Icons.IC_SEARCH} width={40} height={40} onPress={onSearch} />}</Right>
    </Container>
  );
};

const Left = styled.View`
  flex: 1;
`;

const Right = styled.View`
  flex: 1;
  flex-direction: row-reverse;
`;

const Center = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  height: 56px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: space-between;
  background-color: ${(props: AppBarStyle) => (props.backgroundColor && props.backgroundColor) || 'white'};
`;
