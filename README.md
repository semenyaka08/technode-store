# TechNode Store

TechNode Store is a full-stack web application designed for managing an online computer hardware store. Built using ASP.NET Core for the backend and Angular for the frontend, this project aims to deliver a seamless and user-friendly shopping experience.

## Features

- **Product Management**: Add, edit, and delete products.
- **Order Management**: View, process, and update order statuses.
- **User Authentication and Authorization**: Register, log in, and manage user roles.
- **Search and Filtering**: Find products easily with advanced search and filtering options.
- **Payment Integration**: Stripe is used to securely process payments.
- **Image Uploads**: Uploadcare is used to handle file and image uploads.

## Technologies

- **Backend**: ASP.NET Core with Entity Framework Core for database management.
- **Frontend**: Angular (v18) with modern libraries for state management and UI components.
- **Database**: SQL Server (default, but configurable).
- **Third-party Services**:
  - Stripe: For payment processing.
  - Uploadcare: For image and file uploads.
- **Build Tools**: Node.js for frontend dependencies and .NET CLI for backend operations.

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- .NET SDK (6.0 or later)
- Node.js (16.x or later)
- SQL Server (or another compatible RDBMS)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/semenyaka08/technode-store.git
   cd technode-store
   ```

2. **Configure the database**:
   - Update the connection string in `TechNode.Api/appsettings.json` to match your SQL Server setup.
   - Run database migrations:
     ```bash
     cd TechNode.Api
     dotnet ef database update
     ```

3. **Configure Stripe and Uploadcare**:
   - Add your Stripe API keys in the `TechNode.Api/appsettings.json` file:
     ```json
     "Stripe": {
         "PublishableKey": "your-publishable-key",
         "SecretKey": "your-secret-key"
     }
     ```
   - Add your Uploadcare public key in the Angular environment configuration files (`src/environments/environment.ts`):
     ```typescript
     export const environment = {
       production: false,
       uploadcarePublicKey: 'your-uploadcare-public-key'
     };
     ```

4. **Run the backend**:
   ```bash
   cd TechNode.Api
   dotnet run
   ```

5. **Run the frontend**:
   ```bash
   cd client
   npm install
   ng serve --port 4200
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`.

## Project Structure

- `TechNode.Api`: ASP.NET Core backend, handling APIs and business logic.
- `TechNode.Core`: Core application models and domain logic.
- `TechNode.Infrastructure`: Data access and external service integration.
- `client`: Angular frontend.

---

# Асинхронне програмування в "technode-store" 

## Огляд проекту
Цей додаток, побудований на основі ASP.NET Core на стороні серверу та Angular на стороні клієнту, ефективно використовує асинхронне програмування для забезпечення швидкого відгуку, масштабованості та обробки тривалих операцій, таких як взаємодія з базами даних, API або іншими third-party сервісами.

---

## Серверна частина
На сервері використовується ASP.NET Core для виконання асинхронних запитів, забезпечення масштабованості та мінімізації затримок. Ключові моменти:

### Асинхронні контролери
- **AccountController**:
  - Реєстрація користувача (`Register`) виконується асинхронно для забезпечення швидкого відгуку при взаємодії з UserManager.
  - Вихід користувача (`Logout`) реалізовано через `SignOutAsync`, щоб забезпечити асинхронну обробку сесій.
  - Отримання інформації про користувача (`GetUserInfo`) та оновлення адреси (`UpdateUserAddress`) також реалізовано через асинхронні методи з використанням `UserManager`.

- **CartController**:
  - Використання асинхронних методів для роботи з Redis, таких як `GetCartAsync`, `SetCartAsync`, та `DeleteCartAsync`.

### SignalR для реального часу
- У **NotificationHub** відслідковується підключення та відключення користувачів асинхронно, що дозволяє надсилати повідомлення в реальному часі.

### Асинхронна інтеграція з Redis
- Використання Redis для зберігання та отримання інформації про кошики покупок через бібліотеку `StackExchange.Redis`.

📌 **Посилання на код**:
- [AccountController.cs](TechNode.Api/Controllers/AccountController.cs)
- [ClaimPrincipleExtensions.cs](TechNode.Api/Extensions/ClaimPrincipleExtensions.cs)
- [CartController.cs](TechNode.Api/Controllers/CartController.cs)
- [NotificationHub.cs](TechNode.Api/SignalR/NotificationHub.cs)
- [CartService.cs](TechNode.Infrastructure/Services/CartService.cs)

---

## Клієнтська частина
На клієнті використовується Angular з RxJS для обробки асинхронних запитів до серверу та управління станом додатку. Основні моменти:

### HTTP-запити
- **AccountService**:
  - Отримання інформації про користувача (`getCurrentUser`) використовує `HttpClient` з `pipe` для обробки даних.
  - Авторизація (`login`) і реєстрація (`register`) виконуються через асинхронні запити до API.

- **CartService**:
  - Методи для роботи з кошиком (`getCart`, `setCart`, `deleteCart`, `addCartItemToCart`) забезпечують асинхронну інтеграцію з API та локальне збереження даних.

### SignalR
- У **InitService** інтеграція з SignalR для створення з'єднання та синхронізації даних у реальному часі.

### RxJS для обробки потоків даних
- Використання `signal` і `computed` для реактивного управління станом додатку, наприклад, кількість товарів у кошику або розрахунок загальної суми.

📌 **Посилання на код**:
- [AccountService.ts](client/src/app/core/services/account.service.ts)
- [CartService.ts](client/src/app/core/services/cart.service.ts)
- [InitService.ts](client/src/app/core/services/init.service.ts)

---

## Особливості асинхронного програмування

### Переваги асинхронності
- **Серверна частина**: зменшення блокувань під час роботи з БД (EF Core, Redis).
- **Клієнтська частина**: плавне завантаження даних без блокування інтерфейсу користувача.
- **SignalR**: інтеграція у реальному часі без постійного опитування сервера.

### Інструменти та бібліотеки
- `Task` у C# для роботи з асинхронними методами.
- `RxJS` у Angular для обробки асинхронних потоків.
- Redis для кешування та швидкої обробки даних.

### Практичне застосування
- Асинхронна обробка реєстрації користувачів.
- Оновлення кошика покупок у реальному часі.
- Інтеграція SignalR для оновлення інтерфейсу без перезавантаження сторінки.

---
