import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeed,
  selectFeed,
  selectIsLoading
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isFeedLoading = useSelector(selectIsLoading);
  const feedData = useSelector(selectFeed);
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

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
