import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import {Layout, SafeAreaView, Style, Typography} from '../theme';
import {Icons} from '../resources';
import {IconButton} from '../components/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {RepositoryContext, RepositorySaveData} from '../context/RepositoryContext';
import {ToastMessage} from '../components';
import {IToastMessageProps} from '../components/ToastMessage';

const HEADER_HEIGHT = 56; // HEADER 높이

const HomeScreen = () => {
  const navigation = useNavigation();
  const {starred, removeRepository} = useContext(RepositoryContext);
  const [toastMessage, setToastMessage] = useState<IToastMessageProps>({data: {id: '', result: null}});

  const onPressSearch = () => {
    navigation.dispatch(StackActions.push('RepositoryScreen'));
  };

  const onRemove = async (item: RepositorySaveData) => {
    const result = await removeRepository(item);
    setToastMessage({data: {id: new Date().toString(), result}});
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.dispatch(
            StackActions.push('IssueScreen', {data: {id: item.id, user: item.user, repo: item.repo}}),
          );
        }}>
        <Style.Box paddingTop={index === 0 ? 20 : 0}>
          <Style.Box flexDirection={'row'} justifyContent={'space-between'}>
            <UserLayout>
              <AvatarImage source={{uri: item.avatar_url}} />
              <Typography.H5 marginLeft={8}>{item.user}</Typography.H5>
            </UserLayout>
            <IconButton icon={Icons.IC_LIKE_ON} onPress={() => onRemove(item)} />
          </Style.Box>
          <Typography.Body2>{item.repo}</Typography.Body2>
          <Typography.Body3>{item.description}</Typography.Body3>
        </Style.Box>
      </TouchableOpacity>
    );
  };

  // @ts-ignore
  const itemExtractorKey = (item, index: any) => {
    return index.toString();
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Header>
        <Style.Box justifyContent={'center'}>
          <Typography.H4>Github Explorer</Typography.H4>
        </Style.Box>
        <Style.Box justifyContent={'center'}>
          <IconButton icon={Icons.IC_SEARCH} width={40} height={40} onPress={onPressSearch} />
        </Style.Box>
      </Header>
      <Container>
        <Style.Box>
          <Typography.H4>Starred Repositories</Typography.H4>
          <Typography.Body4 color={Colors.grey65}>소스 저장소는 최대 4개까지 관리할 수 있습니다.</Typography.Body4>
        </Style.Box>
        <RepoFlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={starred}
          renderItem={renderItem}
          keyExtractor={itemExtractorKey}
          ListFooterComponent={() => <Style.Spacer height={80} />}
          ItemSeparatorComponent={() => (
            <Style.Spacer
              width={Layout.width - 48}
              height={1}
              backgroundColor={Colors.grey6}
              marginTop={20}
              marginBottom={12}
            />
          )}
        />
      </Container>
      <ToastMessage data={toastMessage.data} />
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  margin-top: 48px;
  padding-left: 24px;
  padding-right: 24px;
`;

const Header = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-right: 8px;
  justify-content: space-between;
  height: ${HEADER_HEIGHT}px;
`;

const RepoFlatList = styled.FlatList<RepositorySaveData>`
  flex: 1;
  margin-top: 12px;
` as unknown as typeof FlatList;

const UserLayout = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export default HomeScreen;
