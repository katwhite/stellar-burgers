import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, selectFeed, selectIsLoading } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
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
