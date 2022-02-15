import React, {FC, useEffect} from 'react';
import {RepositorySaveResult} from '../context/RepositoryContext';
import Toast from 'react-native-toast-message';

export interface IToastMessageProps {
  data: {
    id: string;
    result: RepositorySaveResult;
  };
}

const ToastMessage: FC<IToastMessageProps> = (props) => {
  const {data} = props;

  const showNotification = React.useCallback(() => {
    console.log('result', data);
    if (!data.result) {
      return;
    }

    let message;
    switch (data.result) {
      case 'added': {
        message = '저장소를 추가했습니다.';
        break;
      }
      case 'deleted': {
        message = '저장소를 삭제했습니다.';
        break;
      }
      case 'max': {
        message = '저장소는 최대 4개까지 저장할 수 있습니다.';
        break;
      }
      case 'save-failed': {
        message = '처리중 에러가 발생하였습니다.';
        break;
      }
      case 'exist': {
        message = '이미 추가된 저장소입니다.';
        break;
      }
      case 'not-exist': {
        message = '존재하지 않는 저장소입니다.';
        break;
      }
      default:
        message = data.result;
    }

    Toast.show({text1: message});
  }, [data]);

  useEffect(() => {
    showNotification();
  }, [showNotification]);

  return <Toast position={'bottom'} bottomOffset={80} />;
};

export default ToastMessage;
