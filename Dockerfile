FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy your entire test framework
COPY tests/ ./tests/
COPY pages/ ./pages/
COPY test-data/ ./test-data/
COPY fixtures/ ./fixtures/
COPY playwright.config.ts ./

# Install Playwright browsers
RUN npx playwright install chromium --with-deps

CMD ["npx", "playwright", "test"]