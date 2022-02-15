import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import {Layout, SafeAreaView, Style, Typography} from '../theme';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {AppBar} from '../components';
import {RootRouteProps} from '../../App';
import {GithubTypes, Service} from '../networks/github.apis';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import Tag from '../components/Tag';
import Utils from '../utils/Utils';

const IssueScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'IssueScreen'>>();
  const queryClient = useQueryClient();

  const PER_PAGE = 15;
  const QUERY_KEY = ['issues', route.params.data.id];

  useEffect(() => {
    return () => {
      queryClient.removeQueries(QUERY_KEY, {exact: true});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchIssues = async ({pageParam = 1}) => {
    const params: GithubTypes.Issue.ISearchIssuesRequestParams = {
      user: route.params.data.user,
      repo: route.params.data.repo,
      page: pageParam,
      per_page: PER_PAGE,
      state: 'all',
    };
    const results = await Service.fetchIssues(params);
    return {results, nextPage: pageParam + 1, totalPages: results.length < PER_PAGE ? pageParam : pageParam + 1};
  };

  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(QUERY_KEY, fetchIssues, {
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage;
      }

      return undefined;
    },
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });

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
    const issue = item as GithubTypes.Issue.IssueItem;
    const renderState = () => {
      let color;
      switch (issue.state) {
        case 'open': {
          color = Colors.error;
          break;
        }
        case 'closed': {
          color = Colors.grey65;
          break;
        }
        default: {
          color = Colors.black;
          break;
        }
      }

      return <Typography.H7 color={color}>{issue.state.toUpperCase()}</Typography.H7>;
    };

    const renderLabels = () => {
      if (issue.labels.length > 0) {
        return (
          <Style.Box flexDirection={'row'} marginTop={16}>
            {issue.labels.map((label) => (
              <Tag
                key={label.id}
                labelText={label.name}
                labelColor={Colors.white}
                backgroundColor={`#${label.color}`}
                marginRight={4}
              />
            ))}
          </Style.Box>
        );
      } else {
        return null;
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.dispatch(StackActions.push('IssueDetailScreen', {url: issue.html_url}));
        }}>
        <Style.Box paddingTop={index === 0 ? 20 : 0}>
          <ItemHeaderLayout>
            <UserLayout>
              <AvatarImage source={{uri: issue.user.avatar_url}} />
              <Typography.H7 marginLeft={8}>{issue.user.login}</Typography.H7>
            </UserLayout>
            <Style.Box flexDirection={'row'}>{renderState()}</Style.Box>
          </ItemHeaderLayout>
          {renderLabels()}
          <Typography.Body3 marginTop={12}>{issue.title}</Typography.Body3>
          <ItemDateLayout>
            <Typography.Body4 color={Colors.grey65}>Updated: {Utils.getDate(issue.updated_at)}</Typography.Body4>
          </ItemDateLayout>
        </Style.Box>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <AppBar.Basic title={'Issues'} left={true} />
      <Style.Spacer width={Layout.width} height={2} backgroundColor={Colors.grey6} />
      <MainList
        bounces={false}
        data={[]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={() => <Style.Spacer />}
        ListHeaderComponent={
          <StoryFlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={data?.pages?.map((page) => page.results).flat() || []}
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
    </SafeAreaView>
  );
};

const MainList = styled.FlatList`
  flex: 1;
`;

const StoryFlatList = styled.FlatList<GithubTypes.Issue.IssueItem>`
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

const ItemHeaderLayout = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserLayout = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AvatarImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const ItemDateLayout = styled.View`
  margin-top: 24px;
  align-items: flex-end;
`;

export default IssueScreen;
