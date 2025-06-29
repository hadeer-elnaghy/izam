
---

## Getting Started

### Prerequisites

- Node.js & npm
- PHP & Composer
- MySQL or compatible database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hadeer-elnaghy/izam.git
   ```

2. **Install backend dependencies**
   ```bash
   composer install
   ```

3. **Install frontend dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env` and configure your database and mail settings.

5. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Build frontend assets**
   ```bash
   npm run dev
   ```

7. **Start the Laravel server**
   ```bash
   php artisan serve
   ```

---

## API Endpoints

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/products` - List products (with search, filter, pagination)
- `POST /api/orders` - Place an order (requires authentication)


## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

For questions or support, please open an issue or contact the maintainer.
