import React, {FC} from 'react';
import {ImageSourcePropType} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Colors, Typography} from '../theme';

interface IIconButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

interface IconButtonStyle {
  width?: number;
  height?: number;
  iconWidth?: number;
  iconHeight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  radius?: number;
  backgroundColor?: string;
  containerStyle?: any;
}

type IconButtonType = IIconButtonProps & IconButtonStyle;

export const IconButton: FC<IconButtonType> = (props) => {
  const {
    icon,
    iconWidth,
    iconHeight,
    width,
    height,
    radius,
    backgroundColor,
    onPress,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    containerStyle,
  } = props;
  return (
    <IconButtonContainer style={{marginTop, marginRight, marginBottom, marginLeft}}>
      <Button activeOpacity={0.9} onPress={onPress}>
        <IconButtonLayout style={{width, height, ...containerStyle}} radius={radius} backgroundColor={backgroundColor}>
          <IconButtonImage source={icon} resizeMode={'contain'} iconWidth={iconWidth} iconHeight={iconHeight} />
        </IconButtonLayout>
      </Button>
    </IconButtonContainer>
  );
};

const IconButtonContainer = styled.View``;

const Button = styled.TouchableOpacity``;

const IconButtonLayout = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: ${(props: IconButtonStyle) => (props.radius && props.radius) || 0}px;
  background-color: ${(props: IconButtonStyle) => props.backgroundColor && props.backgroundColor};
  ${(props: IconButtonStyle) => props.containerStyle && props.containerStyle}
`;

const IconButtonImage = styled.Image<IconButtonStyle>`
  width: ${(props) => (props.iconWidth && props.iconWidth) || 24}px;
  height: ${(props) => (props.iconHeight && props.iconHeight) || 24}px;
`;

interface ISimpleButtonProps {
  text: string;
  textSize?: 5 | 6;
  color?: string;
  onPress: () => void;
}

interface SimpleButtonStyleProps {
  mode: 'default' | 'fill' | 'border';
  width?: number;
  height?: number;
  disabled: boolean;
  backgroundColor?: string;
}

export const SimpleButton: FC<ISimpleButtonProps & SimpleButtonStyleProps> = (props) => {
  const {text, textSize, color, width, height, onPress, mode, disabled, backgroundColor} = props;

  const defaultComponents = {
    5: <Typography.H5 color={color ? color : disabled ? Colors.grey25 : Colors.white}>{text}</Typography.H5>,
    6: <Typography.H6 color={color ? color : disabled ? Colors.grey25 : Colors.white}>{text}</Typography.H6>,
  };

  const otherComponents = {
    5: <Typography.H5 color={color ? color : disabled ? Colors.grey25 : Colors.grey100}>{text}</Typography.H5>,
    6: <Typography.H6 color={color ? color : disabled ? Colors.grey25 : Colors.grey100}>{text}</Typography.H6>,
  };

  return (
    <Button activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <SimpleButtonLayout
        style={{width: width || '100%', height: height || 46}}
        mode={mode}
        disabled={disabled}
        backgroundColor={backgroundColor}>
        {mode === 'default' ? defaultComponents[textSize || 5] : otherComponents[textSize || 5]}
      </SimpleButtonLayout>
    </Button>
  );
};

const SimpleButtonLayout = styled.View`
  width: 100%;
  height: 46px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  ${(props: SimpleButtonStyleProps) =>
    props.mode === 'default' &&
    css`
      background-color: ${props.backgroundColor
        ? props.backgroundColor
        : props.disabled
        ? Colors.grey6
        : Colors.grey100};
    `}
  ${(props: SimpleButtonStyleProps) =>
    props.mode === 'fill' &&
    css`
      background-color: ${props.backgroundColor ? props.backgroundColor : Colors.grey6};
      border: 1px solid ${Colors.grey6};
    `}
  ${(props: SimpleButtonStyleProps) =>
    props.mode === 'border' &&
    css`
      background-color: ${props.backgroundColor ? props.backgroundColor : Colors.white};
      border: 1px solid ${props.disabled ? Colors.grey6 : Colors.grey100};
    `}
`;
