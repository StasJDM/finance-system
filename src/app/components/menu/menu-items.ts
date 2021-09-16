export interface MenuItem {
  title: string;
  link: string;
}

export const menuItems = [
  {
    title: 'Мой бюджет',
    link: '/budget',
  },
  {
    title: 'Доходы',
    link: 'income',
  },
  {
    title: 'Расходы',
    link: '/expenses',
  },
];
