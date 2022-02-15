import {Dimensions, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');
const StatusBarHeight = (Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight) as number;

/**
 * 스크롤이 화면 끝에 도달 했는지 체크
 * @param layoutMeasurement
 * @param contentOffset
 * @param contentSize
 */
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export {width, height, StatusBarHeight, getBottomSpace, isCloseToBottom};
