# Contributing to 7CEPL

Thank you for your interest in contributing to the 7CEPL website! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear and descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Why it would be useful
- Any implementation ideas you have

### Submitting Changes

1. **Fork** the repository
2. **Create** a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes
4. **Test** your changes locally:
   ```bash
   npm run dev
   ```
   Then verify at `http://localhost:3000`.
5. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: brief description of changes"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open** a Pull Request

## Project Setup

```bash
git clone https://github.com/WarmAuthor/7CEPL.git
cd 7CEPL
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
ADMIN_API_KEY=dev-test-key
```

Start the development server:

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## Code Style

- Use consistent indentation (4 spaces)
- Write semantic HTML5
- Keep CSS organized and well-commented
- Use descriptive variable and function names in JavaScript
- Follow the existing modular structure for backend code:
  - **Routes** go in `routes/`
  - **Middleware** goes in `middleware/`
  - **Utilities** go in `utils/`
  - **Data files** go in `data/`

## Testing API Endpoints

After making backend changes, test all endpoints:

```bash
# Track a shipment
curl http://localhost:3000/api/track/7CEPL12345

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","message":"Test message"}'

# Submit quote request
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","origin":"Mumbai","destination":"London","cargoType":"General","serviceType":"Air Freight"}'

# Admin operations (requires API key)
curl -X PUT http://localhost:3000/api/admin/shipments/7CEPL12345 \
  -H "x-api-key: dev-test-key" \
  -H "Content-Type: application/json" \
  -d '{"status":"In Transit","location":"Airport"}'
```

---

Thank you for contributing! 🚀
