export const getBookListPipeline = (skip?: number, limit?: number) => ([
  {
    $match: {
      borrowedBy: null,
    },
  },
  {
    $group: {
      _id: '$referenceId',
      referenceId: {
        $first: '$referenceId',
      },
      author: {
        $first: '$author',
      },
      createdAt: {
        $first: '$createdAt',
      },
      description: {
        $first: '$description',
      },
      isAvailable: {
        $first: '$isAvailable',
      },
      numberOfCopies: {
        $sum: 1,
      },
      originalId: {
        $first: '$originalId',
      },
      publishedYear: {
        $first: '$publishedYear',
      },
      title: {
        $first: '$title',
      },
    },
  },
  {
    $sort: {
      publishedYear: -1,
    },
  },
  skip && {
    $skip: skip,
  },
  limit && {
    $limit: limit,
  },
].filter(Boolean));

export const getBookListByIdsPipeline = (borrowedBy?: string) => ([
  {
    $match: {
      borrowedBy,
    },
  },
]);