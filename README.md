# React Movies Search with Pagination

Приложение для поиска фільмів з пагінацією, використовуючи TMDB API, TanStack Query та React Paginate.

## 🚀 Функціональність

- **Пошук фільмів** за назвою через TMDB API
- **Пагінація результатів** з навігацією по сторінках
- **Модальне вікно** з детальною інформацією про фільм
- **Кешування запитів** за допомогою TanStack Query
- **Адаптивний дизайн** для всіх пристроїв
- **Сповіщення** про помилки та статус завантаження

## 🛠 Технології

- **React 18** - основний фреймворк
- **TypeScript** - типізація
- **Vite** - збірник проекту
- **TanStack Query** - управління станом запитів та кешування
- **React Paginate** - компонент пагінації
- **Axios** - HTTP-клієнт для API запитів
- **CSS Modules** - стилізація компонентів
- **React Hot Toast** - сповіщення
- **Modern Normalize** - нормалізація стилів

## 📁 Структура проекту

```plaintext
src/
├── components/
│   ├── App/
│   │   ├── App.tsx
│   │   └── App.module.css
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   └── SearchBar.module.css
│   ├── MovieGrid/
│   │   ├── MovieGrid.tsx
│   │   └── MovieGrid.module.css
│   ├── MovieModal/
│   │   ├── MovieModal.tsx
│   │   └── MovieModal.module.css
│   ├── Loader/
│   │   ├── Loader.tsx
│   │   └── Loader.module.css
│   └── ErrorMessage/
│       ├── ErrorMessage.tsx
│       └── ErrorMessage.module.css
├── services/
│   └── movieService.ts
├── types/
│   └── movie.ts
├── index.css
└── main.tsx
```

## 🚀 Встановлення та запуск

1. **Клонуйте репозиторій:**

```bash
git clone https://github.com/ВАШ_НІКНЕЙМ/04-react-query.git
cd 04-react-query
```

1. **Встановіть залежності:**

```bash
npm install
```

1. **Створіть файл `.env` у корені проекту:**

```env
VITE_TMDB_TOKEN=your_tmdb_api_token_here
```

1. **Отримайте API токен:**

   - Зареєструйтеся на [TMDB](https://www.themoviedb.org/)
   - Перейдіть у Settings → API
   - Скопіюйте "API Read Access Token"

1. **Запустіть проект:**

```bash
npm run dev
```

1. **Відкрийте у браузері:**

```plaintext
http://localhost:5173
```

## 🔧 Доступні скрипти

- `npm run dev` - запуск сервера розробки
- `npm run build` - збірка проекту для продакшену
- `npm run preview` - попередній перегляд зібраного проекту
- `npm run lint` - перевірка коду лінтером

## 🌟 Особливості реалізації

### TanStack Query

- **Кешування запитів** - повторні запити використовують кеш
- **Автоматичне управління станом** - loading, error, success
- **Оптимізація продуктивності** - запити виконуються тільки при необхідності

### Пагінація

- **React Paginate** - готовий компонент з кастомними стилями
- **Розумна навігація** - відображається тільки при наявності кількох сторінок
- **Скидання сторінки** - автоматичний перехід на першу сторінку при новому пошуку

### Типізація

- **Повна типізація TypeScript** - всі компоненти та API відповіді типізовані
- **Інтерфейси для API** - чітка структура даних від TMDB
- **Type-safe пропси** - безпечна передача даних між компонентами

## 🔗 Посилання

- [Демо на Vercel](ваше_посилання_на_vercel)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Paginate](https://github.com/AdeleD/react-paginate)

## 📝 Ліцензія

MIT License - використовуйте вільно для навчання та розробки.
