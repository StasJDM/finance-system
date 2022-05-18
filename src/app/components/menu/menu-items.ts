export interface MenuItem {
  title: string;
  link: string;
  isActive: boolean;
}

export const menuItemsTop = [
  {
    title: 'Мой бюджет',
    link: '/budget',
    isActive: false,
  },
  {
    title: 'Контакты',
    link: '/contacts',
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
  {
    title: ' Новости',
    link: '/news',
    isActive: false,
  },
  {
    title: 'Транзакции',
    link: '/transactions',
    isActive: false,
  },
  {
    title: 'Заметки',
    link: '/notes',
    isActive: false,
  },
];

export const menuItemsBottom = [
  {
    title: 'Администрирование',
    link: '/admin',
    isActive: false,
  },
  {
    title: 'Мой профиль',
    link: 'profile',
    isActive: false,
  },
];
