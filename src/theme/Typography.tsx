import React, {FC} from 'react';
import Colors from './Colors';
import styled from 'styled-components/native';

interface TypographyStyleProps {
  children?: any;
  color?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

type TypographyStyleType = TypographyStyleProps & Record<string, any>;

export const Normal: FC<TypographyStyleType> = (props) => {
  const {children, color, ...rest} = props;
  return (
    <Container style={{...rest}}>
      <Heading4 style={{color}}>{children}</Heading4>
    </Container>
  );
};

export const H1: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading1 style={{color}}>{children}</Heading1>
    </Container>
  );
};

export const H2: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading2 style={{color}}>{children}</Heading2>
    </Container>
  );
};

export const H3: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading3 style={{color}}>{children}</Heading3>
    </Container>
  );
};

export const H4: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading4 style={{color}}>{children}</Heading4>
    </Container>
  );
};

export const H5: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading5 style={{color}}>{children}</Heading5>
    </Container>
  );
};

export const H6: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading6 style={{color}}>{children}</Heading6>
    </Container>
  );
};

export const H7: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Heading7 style={{color}}>{children}</Heading7>
    </Container>
  );
};

export const Body1: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Normal1 style={{color}}>{children}</Normal1>
    </Container>
  );
};

export const Body2: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Normal2 style={{color}}>{children}</Normal2>
    </Container>
  );
};

export const Body3: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Normal3 style={{color}}>{children}</Normal3>
    </Container>
  );
};

export const Body4: FC<TypographyStyleType> = (props) => {
  const {children, color, marginTop, marginRight, marginBottom, marginLeft, ...rest} = props;
  return (
    <Container style={{marginTop, marginRight, marginBottom, marginLeft, ...rest}}>
      <Normal4 style={{color}}>{children}</Normal4>
    </Container>
  );
};

const Container = styled.Text``;

const Heading1 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 24px;
  line-height: 38px;
  color: ${Colors.grey100};
`;
const Heading2 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 20px;
  line-height: 30px;
  color: ${Colors.grey100};
`;
const Heading3 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 18px;
  line-height: 26px;
  color: ${Colors.grey100};
`;
const Heading4 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.grey100};
`;
const Heading5 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 14px;
  line-height: 24px;
  color: ${Colors.grey100};
`;
const Heading6 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.grey100};
`;
const Heading7 = styled.Text`
  font-family: ${'NotoSansKR-Bold'};
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.grey100};
`;

const Normal1 = styled.Text`
  font-family: ${'NotoSansKR-Regular'};
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.grey100};
`;
const Normal2 = styled.Text`
  font-family: ${'NotoSansKR-Regular'};
  font-size: 14px;
  line-height: 22px;
  color: ${Colors.grey100};
`;
const Normal3 = styled.Text`
  font-family: ${'NotoSansKR-Regular'};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.grey100};
`;
const Normal4 = styled.Text`
  font-family: ${'NotoSansKR-Regular'};
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.grey100};
`;
