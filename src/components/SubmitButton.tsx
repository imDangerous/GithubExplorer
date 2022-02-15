import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors, Typography} from '../theme';
import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {getBottomSpace} from '../theme/Layout';

interface ISubmitButtonProps {
  text: string;
  onPress: () => void;
}

interface SubmitButtonStyleProps {
  disabled: boolean;
}

const SubmitButton: FC<ISubmitButtonProps & SubmitButtonStyleProps> = (props) => {
  const {disabled, text, onPress} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={disabled}>
      <SubmitButtonLayout disabled={disabled}>
        <Typography.H4 color={disabled ? Colors.grey25 : Colors.white}>{text}</Typography.H4>
      </SubmitButtonLayout>
    </TouchableOpacity>
  );
};

const SubmitButtonLayout = styled.View`
  width: 100%;
  height: ${56 + (isIphoneX() ? getBottomSpace() : 0)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: SubmitButtonStyleProps) => (props.disabled ? Colors.grey6 : Colors.grey100)};
`;

export default SubmitButton;
