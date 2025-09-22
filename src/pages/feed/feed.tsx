import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, selectFeed, selectIsLoading } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isFeedLoading = useSelector(selectIsLoading);
  const feedData = useSelector(selectFeed);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feedData.orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
