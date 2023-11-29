export const data = [
  {
    _id: 1,
    name: '서울특별시',
    depth: 1,
    items: [
      {
        _id: 2,
        name: '구로구',
        depth: 2,
        items: [
          { _id: 3, name: '구로 1가', depth: 3 },
          { _id: 4, name: '구로 2가', depth: 3 },
          { _id: 5, name: '구로 3가', depth: 3 },
          { _id: 6, name: '구로 4가', depth: 3 },
        ],
      },
    ],
  },
  {
    _id: 7,
    name: '경기도',
    depth: 1,
    items: [
      {
        _id: 8,
        name: '구리시',
        depth: 2,
        items: [
          { _id: 9, name: '인창동', depth: 3 },
          { _id: 10, name: '토평동', depth: 3 },
          { _id: 11, name: '수택동', depth: 3 },
          { _id: 12, name: '교문동', depth: 3 },
        ],
      },
      {
        _id: 13,
        name: '남양주시',
        depth: 2,
        items: [
          { _id: 14, name: '도농동', depth: 3 },
          { _id: 15, name: '호평동', depth: 3 },
        ],
      },
    ],
  },
];
