import React from 'react';
import styled from 'styled-components/native';
import {Colors, Typography} from '../theme';

interface ITagProps {
  readonly labelText: string;
  readonly labelColor?: string;
}

interface ITagStyleProps {
  readonly backgroundColor?: string;
  readonly marginLeft?: number;
  readonly marginRight?: number;
}

type ItemTagType = ITagProps & ITagStyleProps;

const Tag: React.FC<ItemTagType> = (props): React.ReactElement => {
  const {backgroundColor, marginLeft, marginRight, labelText, labelColor} = props;
  return (
    <Container style={{marginLeft, marginRight}} backgroundColor={backgroundColor}>
      <Typography.H7 color={labelColor}>{labelText}</Typography.H7>
    </Container>
  );
};

const Container = styled.View<ITagStyleProps>`
  margin-right: 8px;
  border-radius: 8px;
  padding: 2px 8px 4px 8px;
  background-color: ${(props) => (props.backgroundColor && props.backgroundColor) || Colors.grey6};
`;

export default Tag;
