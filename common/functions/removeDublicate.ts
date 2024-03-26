export const removeDuplicates = (arr: any) => {
  const uniqueOrders = new Map<number, any>();

  for (const order of arr) {
    uniqueOrders.set(order.id, order);
  }

  return Array.from(uniqueOrders.values());
};
