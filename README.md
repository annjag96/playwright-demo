# Playwright E2E Testing Framework

[![Playwright Tests](https://github.com/annjag96/playwright-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/annjag96/playwright-demo/actions/workflows/playwright.yml)

A comprehensive end-to-end testing framework built with Playwright and TypeScript, featuring API testing, visual regression, and CI/CD automation.

## Features

- **Page Object Model** - Maintainable test architecture
- **Visual Regression Testing** - Cross-browser screenshot comparison
- **API + UI Hybrid Tests** - Network interception and validation
- **CI/CD Integration** - Automated tests on every commit
- **Docker Support** - Consistent test environment
- **Multi-browser Testing** - Chrome, Firefox, Safari, Mobile

## Test Scenarios

### API Tests
```bash
docker-compose -f docker-compose.api.yml up --build --abort-on-container-exit
```

### Regression Tests
```bash
docker-compose -f docker-compose.regression.yml up --build --abort-on-container-exit
```

### Visual Comparison Tests
```bash
docker-compose -f docker-compose.visual.yml up --build --abort-on-container-exit
```

### All Tests
```bash
docker-compose -f docker-compose.all.yml up --build --abort-on-container-exit
```

### Run All Suites in Parallel
```bash
docker-compose -f docker-compose.parallel.yml up --build --abort-on-container-exit
```

## Test Execution Time (approximate)
- API Tests: ~2 minutes
- Regression Tests: ~10 minutes
- Visual Tests: ~5 minutes
- All Tests: ~15 minutes
- Parallel Execution: ~10 minutes (runs simultaneously)