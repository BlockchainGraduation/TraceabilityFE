const getPercent = (total: number, value: number) => {
  return ((value / total) * 100).toFixed(2);
};

export default getPercent;
