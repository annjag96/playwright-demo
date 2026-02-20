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