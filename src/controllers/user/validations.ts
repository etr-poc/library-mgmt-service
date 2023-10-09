export default Object.freeze({
  list: {
    limit: {
      in: 'query',
      optional: { options: { nullable: true } },
      toInt: true,
      isInt: { errorMessage: 'limit must be a number' },
    },
    skip: {
      in: 'query',
      optional: { options: { nullable: true } },
      toInt: true,
      isInt: { errorMessage: 'skip must be a number' },
    },
  },
});
