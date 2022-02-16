import React, {FC, forwardRef, Ref, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {TextInput, KeyboardTypeOptions, ReturnKeyTypeOptions, TouchableOpacity} from 'react-native';
import {Colors} from '../theme';
import {Icons} from '../resources';
import Constant from '../constants/Constant';

type InputStyleType = {
  marginTop?: number;
  marginBottom?: number;
  containerHeight?: number;
};

export type InputHandler = {
  focus: () => void;
  blur: () => void;
};

interface ISearchProps {
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  onSubmitEditing?: Function;
  onResult: (valid: boolean, value: string) => void;
  onFocus?: () => void;
  useSecureMode?: boolean;
  useClear?: boolean;
  // 데이터 검사
  scheme?: RegExp;
  min: number;
  max: number;
}

type SearchType = ISearchProps & InputStyleType & Record<string, any>;

export const Search: FC<SearchType> = forwardRef((props, ref: Ref<TextInput>) => {
  const {
    // Props
    defaultValue,
    keyboardType,
    placeholder,
    placeholderTextColor,
    returnKeyType,
    maxLength,
    onSubmitEditing,
    onResult,
    onFocus,
    useSecureMode,
    useClear,
    // 데이터 검사
    scheme,
    min,
    max,
    // Styles
    marginTop,
    marginBottom,
    ...rest
  } = props;

  const validation = useRef(false);
  const [inputText, setInputText] = useState<string>(defaultValue || '');
  const [showClear, setShowClear] = useState(false);

  React.useEffect(() => {
    handleChangeText(defaultValue || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const setValidationRange = (text: string) => {
    if (min <= 0) {
      validation.current = text.length > 0 && text.length <= max;
    } else {
      validation.current = text.length >= min && text.length <= max;
    }
  };

  const handleChangeText = (text: string) => {
    // Range Test
    setValidationRange(text);

    // Scheme Test
    if (scheme && scheme === Constant.RegexNormal) {
      // Scheme 입력값을 체크한 뒤 문자, 숫자 패턴이 아닌 것은 제거한다.
      text = text.replace(scheme, '');

      // Range Re-Test
      setValidationRange(text);
    } else {
      if (scheme) {
        // Scheme 패턴 체크
        validation.current = !!scheme.test(text);
      }
    }

    if (useClear) {
      if (text.length > 0) {
        setShowClear(true);
      } else {
        setShowClear(false);
      }
    }

    setInputText(text);
    onResult(validation.current, text);
  };

  const handleSubmitEditing = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
    }
  };

  const onClear = () => {
    // setInputText('');
    // onResult(validation.current, '');
    handleChangeText('');
    setShowClear(false);
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <Container style={{marginTop, marginBottom}}>
      <SearchTextInput
        ref={ref}
        underlineColorAndroid={'transparent'}
        numberOfLines={1}
        autoFocus={false}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={inputText}
        defaultValue={inputText}
        onChangeText={handleChangeText}
        keyboardType={keyboardType || 'default'}
        placeholder={placeholder || ''}
        placeholderTextColor={placeholderTextColor || Colors.grey45}
        returnKeyType={returnKeyType || 'next'}
        secureTextEntry={useSecureMode || false}
        maxLength={maxLength || 20}
        blurOnSubmit={false}
        textContentType={'oneTimeCode'}
        onSubmitEditing={() => handleSubmitEditing()}
        onFocus={() => handleFocus()}
        {...rest}
      />
      {useClear && showClear && (
        <ClearIconLayout>
          <TouchableOpacity activeOpacity={0.9} onPress={onClear}>
            <ClearIconImage source={Icons.IC_CLEAR} />
          </TouchableOpacity>
        </ClearIconLayout>
      )}
    </Container>
  );
});

const Container = styled.View``;

const SearchTextInput = styled(TextInput)`
  height: ${(props: InputStyleType) => (props.containerHeight ? props.containerHeight : 46)}px;
  border: 1px solid ${Colors.grey15};
  border-radius: 8px;
  padding: 0 40px 0 12px;
  text-align: left;
  align-items: center;
`;

const ClearIconLayout = styled.View`
  position: absolute;
  right: 12px;
  top: ${(props: InputStyleType) => {
    const height = props.containerHeight || 48;
    return height / 2 - 10;
  }}px;
`;

const ClearIconImage = styled.Image`
  width: 18px;
  height: 18px;
`;
