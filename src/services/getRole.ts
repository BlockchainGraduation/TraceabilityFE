const getRole = (role: string) => {
  switch (role) {
    case 'FACTORY':
      return 'Nhà máy chế biến';
    case 'DISTRIBUTER':
      return 'Nhà phân phối';
    case 'RETAILER':
      return 'Nhà bán lẻ';

    default:
      return 'Chủ sở hữu';
  }
};
export default getRole;
