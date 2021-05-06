export const FEED_COUNT = 'FEED_COUNT';
export const FEED_INCREASE = 'FEED_INCREASE';

export type FeedActionsType = FeedChangeType | FeedIncreaseType;

export type FeedChangeType = {
  type: typeof FEED_COUNT;
  payload: number;
};

export type FeedIncreaseType = {
  type: typeof FEED_INCREASE;
}

export const feedChange: (count: number) => FeedChangeType = (count) => ({
  type: FEED_COUNT,
  payload: count,
});

export const feedIncrease: FeedIncreaseType = {
  type: FEED_INCREASE,
}
