import styled from 'styled-components/native';
import Colors from './Colors';

type HorizontalStyleProps = {
  marginTop?: number;
  marginBottom?: number;
};

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${Colors.grey15};
  margin-top: ${(props: HorizontalStyleProps) => (props.marginTop && props.marginTop) || 0}px;
  margin-bottom: ${(props: HorizontalStyleProps) => (props.marginBottom && props.marginBottom) || 0}px;
`;

type LayoutStyleProps = {
  flexDirection?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  justifyContent?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  backgroundColor?: string;
};

const Box = styled.View<LayoutStyleProps>`
  flex-direction: ${(props) => (props.flexDirection && props.flexDirection) || 'column'};
  justify-content: ${(props) => (props.justifyContent && props.justifyContent) || 'flex-start'};
  margin-top: ${(props) => (props.marginTop && props.marginTop) || 0}px;
  margin-right: ${(props) => (props.marginRight && props.marginRight) || 0}px;
  margin-bottom: ${(props) => (props.marginBottom && props.marginBottom) || 0}px;
  margin-left: ${(props) => (props.marginLeft && props.marginLeft) || 0}px;
  padding-top: ${(props) => (props.paddingTop && props.paddingTop) || 0}px;
  padding-bottom: ${(props) => (props.paddingBottom && props.paddingBottom) || 0}px;
  padding-left: ${(props) => (props.paddingLeft && props.paddingLeft) || 0}px;
  padding-right: ${(props) => (props.paddingRight && props.paddingRight) || 0}px;
  background-color: ${(props) => props.backgroundColor && props.backgroundColor};
`;

type SpacerStyleProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
};

const Spacer = styled.View<SpacerStyleProps & LayoutStyleProps>`
  width: ${(props) => (props.width && props.width) || 0}px;
  height: ${(props) => (props.height && props.height) || 0}px;
  background-color: ${(props) => props.backgroundColor && props.backgroundColor};
  margin-top: ${(props: LayoutStyleProps) => (props.marginTop && props.marginTop) || 0}px;
  margin-right: ${(props: LayoutStyleProps) => (props.marginRight && props.marginRight) || 0}px;
  margin-bottom: ${(props: LayoutStyleProps) => (props.marginBottom && props.marginBottom) || 0}px;
  margin-left: ${(props: LayoutStyleProps) => (props.marginLeft && props.marginLeft) || 0}px;
`;

const ProgressView = styled.View`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
`;

const ContainerFlex = styled.View`
  flex: 1;
`;

export {HorizontalLine, Box, Spacer, ProgressView, ContainerFlex};
