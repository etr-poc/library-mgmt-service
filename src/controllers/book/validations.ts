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
    userId: {
      in: 'query',
      optional: { options: { nullable: true } },
      isString: { errorMessage: 'userId must be a string' },
    },
  },
  update: {
    id: {
      in: 'params',
      notEmpty: true,
      isString: { errorMessage: 'id must be a non-empty string' },
    },
    userId: {
      in: 'params',
      notEmpty: true,
      isString: { errorMessage: 'userId must be a non-empty string' },
    },
  },
});
