import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Modal, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import {Layout, SafeAreaView, Style, Typography} from '../theme';
import {StackActions, useNavigation} from '@react-navigation/native';
import {AppBar, Input, ToastMessage} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IconButton, SimpleButton} from '../components/Button';
import {Service, GithubTypes} from '../networks/github.apis';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {Icons} from '../resources';
import {RepositoryContext} from '../context/RepositoryContext';
import {IToastMessageProps} from '../components/ToastMessage';
import Utils from '../utils/Utils';

const RepositoryScreen = () => {
  const QUERY_KEY = ['search', 'repositories'];

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {starred, addRepository, removeRepository} = useContext(RepositoryContext);
  const [toastMessage, setToastMessage] = useState<IToastMessageProps>({data: {id: '', result: null}});
  const [visibleSearchView, setVisibleSearchView] = useState<boolean>(true);
  const [searchDisabled, setSearchDisabled] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');
  const [searchUser, setSearchUser] = useState('');

  const validSearchText = useRef(false);
  const textSearchText = useRef('');

  const validSearchUser = useRef(false);
  const textSearchUser = useRef('');

  useEffect(() => {
    return () => {
      queryClient.removeQueries(QUERY_KEY, {exact: true});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSearchText = (valid: boolean, text: string) => {
    validSearchText.current = valid;
    textSearchText.current = text;

    if (valid) {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  };

  const onChangeSearchUser = (valid: boolean, text: string) => {
    validSearchUser.current = valid;
    textSearchUser.current = text;
  };

  const onPressSearch = () => {
    setVisibleSearchView(true);
  };

  const onPressChangeView = () => {
    if (visibleSearchView) {
      setSearchText(textSearchText.current);
      setSearchUser(textSearchUser.current);
      setVisibleSearchView(false);
    } else {
      navigation.goBack();
    }
  };

  const onSubmitSearch = () => {
    setSearchText(textSearchText.current);
    setSearchUser(textSearchUser.current);
    refetch().then();
  };

  const onFavor = (item: GithubTypes.Repository.RepositoryItem) => {
    const prevStory: any = queryClient.getQueryData(QUERY_KEY);
    if (prevStory) {
      const editStory: any = Utils.deepClone(prevStory);
      editStory.pages.map((page: any) => {
        page.results.items.map((i: GithubTypes.Repository.RepositoryItem) => {
          if (i.id === item.id) {
            i.favor = !i.favor;
          }

          return i;
        });
      });

      queryClient.setQueryData(QUERY_KEY, editStory);
    }
  };

  const onAdd = async (item: GithubTypes.Repository.RepositoryItem) => {
    const result = await addRepository({
      id: item.id,
      avatar_url: item.owner.avatar_url,
      user: item.owner.login,
      favor: true,
      repo: item.name,
      description: item.description,
    });

    if (result === 'added') {
      onFavor(item);
    }

    setToastMessage({data: {id: new Date().toString(), result}});
  };

  const onRemove = async (item: GithubTypes.Repository.RepositoryItem) => {
    const result = await removeRepository({
      id: item.id,
      avatar_url: item.owner.avatar_url,
      user: item.owner.login,
      favor: true,
      repo: item.name,
      description: item.description,
    });

    if (result === 'deleted') {
      onFavor(item);
    }

    setToastMessage({data: {id: new Date().toString(), result}});
  };

  const searchRepositories = async ({pageParam = 1}) => {
    let query = textSearchText.current;
    if (validSearchUser.current) {
      query += '+user:' + textSearchUser.current;
    }

    const params: GithubTypes.Repository.ISearchRepositoryRequestParams = {
      q: query,
      page: pageParam,
      per_page: 20,
    };
    const results = await Service.searchRepositories(params);
    return {results, nextPage: pageParam + 1, totalPages: Math.round(results.total_count / params.per_page)};
  };

  const {data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isError} = useInfiniteQuery(
    QUERY_KEY,
    searchRepositories,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        }

        return undefined;
      },
      onSuccess: () => {
        setVisibleSearchView(false);
      },
      enabled: false,
    },
  );

  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  // @ts-ignore
  const itemExtractorKey = (item, index: any) => {
    return item.id + '-' + index.toString();
  };

  const renderLoadMore = () => {
    if (isFetchingNextPage) {
      return (
        <LoadMoreView>
          <ActivityIndicator />
        </LoadMoreView>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({item, index}: any) => {
    const exist = starred.find((star) => star.id === item.id);
    if (exist) {
      item.favor = true;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.dispatch(
            StackActions.push('IssueScreen', {data: {id: item.id, user: item.owner.login, repo: item.name}}),
          );
        }}>
        <Style.Box paddingTop={index === 0 ? 20 : 0}>
          <Style.Box flexDirection={'row'} justifyContent={'space-between'}>
            <UserLayout>
              <AvatarImage source={{uri: item.owner.avatar_url}} />
              <Typography.H5 marginLeft={8}>{item.owner.login}</Typography.H5>
            </UserLayout>
            <IconButton
              marginTop={2}
              marginRight={4}
              icon={item.favor ? Icons.IC_LIKE_ON : Icons.IC_LIKE_OFF}
              onPress={() => (item.favor ? onRemove(item) : onAdd(item))}
            />
          </Style.Box>
          <Typography.Body2>{item.name}</Typography.Body2>
          <Typography.Body3>{item.description}</Typography.Body3>
        </Style.Box>
      </TouchableOpacity>
    );
  };

  const renderSearchModal = () => {
    return (
      <Modal visible={visibleSearchView} animationType={'slide'}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <AppBar.Basic title={'Repository Search'} left={true} onLeftPress={onPressChangeView} />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraScrollHeight={60}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}
            resetScrollToCoords={{x: 0, y: 0}}>
            <Container>
              <Style.Box marginLeft={24} marginRight={24} marginTop={24}>
                <Typography.H6 marginBottom={4}>Repository Name</Typography.H6>
                <Input.Search
                  placeholder={'ex: react'}
                  onResult={onChangeSearchText}
                  min={2}
                  max={50}
                  maxLength={50}
                  useClear={true}
                  defaultValue={searchText}
                />

                <Style.Box flexDirection={'row'} marginTop={16} marginBottom={4}>
                  <Typography.H6>User Name</Typography.H6>
                  <Typography.H6 color={Colors.grey45}> (option)</Typography.H6>
                </Style.Box>
                <Input.Search
                  placeholder={'ex: facebook'}
                  onResult={onChangeSearchUser}
                  min={2}
                  max={50}
                  maxLength={50}
                  useClear={true}
                  defaultValue={searchUser}
                />

                <Style.Box marginTop={32}>
                  <SimpleButton text={'Search'} onPress={onSubmitSearch} mode={'default'} disabled={searchDisabled} />
                </Style.Box>

                {isError && <Typography.H5 color={Colors.error}>Error</Typography.H5>}
              </Style.Box>
            </Container>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <AppBar.Search
        title={'Repositories'}
        left={true}
        onLeftPress={onPressChangeView}
        right={true}
        onRightPress={onPressSearch}
      />
      <Container>
        <Style.Box flexDirection={'row'} marginLeft={24} marginRight={24} marginTop={24} marginBottom={8}>
          <Typography.H7 color={Colors.grey65}>Repositories</Typography.H7>
          {data?.pages[0].results && (
            <Typography.H7 color={Colors.grey65}>
              : {Utils.addNumberComma(data?.pages[0].results.total_count)}
            </Typography.H7>
          )}
        </Style.Box>
        <Style.Spacer width={Layout.width} height={2} backgroundColor={Colors.grey6} />
        <MainList
          bounces={false}
          data={[]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={() => <Style.Spacer />}
          ListHeaderComponent={
            <RepoFlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={data?.pages?.map((page) => page.results.items).flat() || []}
              renderItem={renderItem}
              keyExtractor={itemExtractorKey}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              ListFooterComponent={renderLoadMore}
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
          }
        />
      </Container>
      <ToastMessage data={toastMessage.data} />
      {renderSearchModal()}
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const MainList = styled.FlatList`
  flex: 1;
`;

const RepoFlatList = styled.FlatList<GithubTypes.Repository.RepositoryItem>`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 80px;
` as unknown as typeof FlatList;

const LoadMoreView = styled.View`
  height: 54px;
  justify-content: center;
  align-items: center;
`;

const UserLayout = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export default RepositoryScreen;
