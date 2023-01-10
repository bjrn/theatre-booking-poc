var orders = [
  {
    id: '001',
    createdAt: '2022-09-24T08:45',
    paid: false,
    seats: [1, 2, 3, 4],
  },
  {
    id: '002',
    createdAt: '2022-09-24T08:46',
    paid: false,
    seats: [56],
  },
  {
    id: '003',
    createdAt: '2022-09-24T08:46',
    paid: true,
    seats: [57, 'hcp1'],
  },
];

var s = new Set([...orders.flatMap((order) => order.seats)]);

function isAvailable(seat) {
  return !s.has(seat);
}

console.log(isAvailable(3));
console.log(isAvailable(6));
console.log(isAvailable('hcp1'));
console.log(isAvailable('hcp2'));
