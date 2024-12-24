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

