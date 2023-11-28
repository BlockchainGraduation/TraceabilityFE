const getPercent = (total: number, value: number) => {
  const result = (value / total) * 100;
  return isNaN(result) ? 0 : result.toFixed(2);
};
export default getPercent;
