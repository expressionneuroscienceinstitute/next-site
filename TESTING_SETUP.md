# Playwright Testing Setup for Expression Neuroscience Institute

## Overview

This project now includes a comprehensive Playwright testing suite that covers:

- **Unit Tests**: Navigation, theme functionality, accessibility features
- **Functional Tests**: Page loading, error handling, basic functionality
- **Performance Tests**: Core Web Vitals, load times, resource optimization
- **Accessibility Tests**: WCAG compliance, keyboard navigation, screen reader support
- **Environment-Specific Tests**: Development vs production testing
- **Comprehensive Tests**: End-to-end testing across all aspects

## Test Structure

```
tests/
├── unit/                    # Unit tests for specific components
│   ├── navigation.spec.ts   # Navigation functionality
│   ├── theme.spec.ts        # Theme toggle functionality
│   └── accessibility.spec.ts # Basic accessibility features
├── functional/              # Functional tests
│   └── page-loading.spec.ts # Page loading and content
├── performance/             # Performance tests
│   └── performance.spec.ts  # Core Web Vitals and metrics
├── accessibility/           # Accessibility tests
│   └── accessibility-scan.spec.ts # Comprehensive accessibility
├── dev/                     # Development environment tests
│   └── dev-tests.spec.ts   # Dev-specific features
├── prod/                    # Production environment tests
│   └── production-tests.spec.ts # Production-specific features
├── comprehensive/           # End-to-end tests
│   └── site-comprehensive.spec.ts # Complete site testing
├── basic/                   # Basic functionality tests
│   └── basic-functionality.spec.ts # Core functionality
├── utils/                   # Test utilities
│   └── test-helpers.ts     # Helper functions
├── global-setup.ts         # Global test setup
├── global-teardown.ts      # Global test teardown
└── README.md               # Testing documentation
```

## Test Categories

### Development Environment Tests
- Basic functionality verification
- Development-specific features
- Hot reload testing
- Console error checking

### Production Environment Tests
- Comprehensive functionality tests
- Performance benchmarks
- Accessibility compliance
- SEO optimization
- Security headers
- Error handling
- Cross-browser compatibility

## Performance Budgets

- **Initial Load Time**: < 3 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8 seconds
- **Total Resource Size**: < 5MB

## Accessibility Standards

- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Focus management

## Browser Support

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Android), Safari (iOS)
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

## Running Tests

### All Tests
```bash
npm run test
```

### Environment-Specific Tests
```bash
# Development tests only
npm run test:dev

# Production tests only
npm run test:prod
```

### Test Categories
```bash
# Basic functionality tests
npm run test:basic

# Unit tests
npm run test:unit

# Functional tests
npm run test:functional

# Performance tests
npm run test:performance

# Accessibility tests
npm run test:accessibility
```

### Interactive Testing
```bash
# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug
```

### Test Reports
```bash
# Show test report
npm run test:report
```

## Continuous Integration

### GitHub Actions Workflow
- **Location**: `.github/workflows/test.yml`
- **Triggers**: Push to dev/main branches, pull requests
- **Jobs**:
  - `test-dev`: Development tests (dev branch)
  - `test-prod`: Production tests (main branch)
  - `test-all`: All tests (pull requests)

### Test Execution
- **Development Branch**: Runs development-specific tests
- **Main Branch**: Runs full test suite including production tests
- **Pull Requests**: Runs all tests across all browsers

### Artifacts
- Test results (JSON, JUnit)
- HTML reports with screenshots and videos
- Performance traces
- Console logs
- Preserved for 30 days

## Test Configuration

### Playwright Config (`playwright.config.ts`)
- Multiple browser support (Chromium, Firefox, WebKit)
- Mobile device testing
- Parallel test execution
- HTML, JSON, and JUnit reporting
- Global setup and teardown
- Web server configuration

### Environment Variables
- `BASE_URL`: Base URL for testing (default: http://localhost:3000)
- `CI`: Determines test behavior in CI environment

## Test Utilities

### TestHelpers Class
- `waitForPageLoad()`: Wait for page to be fully loaded
- `checkForConsoleErrors()`: Monitor console errors
- `checkPerformanceMetrics()`: Measure Core Web Vitals
- `checkAccessibility()`: Run accessibility scans
- `checkSEO()`: Validate meta tags and structured data
- `checkImages()`: Verify image loading and alt text
- `checkLinks()`: Validate link functionality
- `checkResponsiveDesign()`: Test across viewport sizes
- `checkThemeToggle()`: Test theme functionality
- `checkNavigation()`: Verify navigation structure
- `checkPageStructure()`: Validate HTML structure

## Best Practices

1. **Test Isolation**: Each test is independent
2. **Page Object Model**: Use TestHelpers for common operations
3. **Performance Budgets**: Enforce performance standards
4. **Accessibility First**: Prioritize accessibility testing
5. **Cross-browser Testing**: Ensure compatibility
6. **Responsive Testing**: Test across viewport sizes
7. **Error Handling**: Test error scenarios
8. **Security Testing**: Verify security headers

## Maintenance

- Update test selectors when UI changes
- Review performance budgets regularly
- Update accessibility standards as needed
- Monitor test execution times
- Review and update test utilities
- Keep dependencies up to date

## Debugging

### Local Debugging
```bash
# Run specific test file
npx playwright test tests/basic/basic-functionality.spec.ts

# Run with debug mode
npx playwright test --debug

# Run with headed browser
npx playwright test --headed
```

### CI Debugging
- Test artifacts uploaded to GitHub Actions
- Screenshots and videos captured on failure
- Console logs preserved
- Performance traces available

## Test Reports

- **HTML Reports**: Interactive test reports with screenshots and videos
- **JSON Reports**: Machine-readable test results
- **JUnit Reports**: CI/CD integration
- **Artifacts**: Preserved for 30 days in GitHub Actions

## Future Enhancements

1. **Visual Regression Testing**: Compare screenshots across changes
2. **API Testing**: Test backend endpoints
3. **E2E User Flows**: Complete user journey testing
4. **Load Testing**: Performance under load
5. **Security Testing**: Automated security scans
6. **Accessibility Audits**: Comprehensive accessibility testing
7. **SEO Testing**: Automated SEO validation
8. **Mobile Testing**: Enhanced mobile device testing

## Notes

- Tests are designed to work with the current website structure
- Performance budgets are set based on modern web standards
- Accessibility tests follow WCAG 2.1 AA guidelines
- Cross-browser testing ensures compatibility
- CI/CD integration provides automated quality assurance 