const allowBuy = (product: ProductType, currentUser: UserType) => {
  if (product.create_by?.id === currentUser.id) {
    return false;
  }
  if (product.product_type === currentUser.role) {
    return false;
  }
  if (
    product.product_type === 'FACTORY' &&
    currentUser.role !== 'DISTRIBUTER'
  ) {
    return false;
  }
  if (
    product.product_type === 'DISTRIBUTER' &&
    currentUser.role !== 'RETAILER'
  ) {
    return false;
  }
  if (currentUser.role === 'MEMBER') {
    return false;
  }
  return true;
};
export default allowBuy;
