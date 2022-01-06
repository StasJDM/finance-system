export interface MenuItem {
  title: string;
  link: string;
  isActive: boolean;
}

export const menuItems = [
  {
    title: 'Мой бюджет',
    link: '/budget',
    isActive: false,
  },
  {
    title: 'Доходы',
    link: '/income',
    isActive: false,
  },
  {
    title: 'Расходы',
    link: '/expenses',
    isActive: false,
  },
];
