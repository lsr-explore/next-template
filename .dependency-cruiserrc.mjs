/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies lead to hard-to-debug issues and tight coupling.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-ui-to-app',
      severity: 'error',
      comment: 'The shared UI library must not depend on app-specific code.',
      from: { path: '^libs/ui/' },
      to: { path: '^src/app/' },
    },
    {
      name: 'no-ui-to-store',
      severity: 'error',
      comment: 'The shared UI library must not depend on application stores.',
      from: { path: '^libs/ui/' },
      to: { path: '^src/store/' },
    },
    {
      name: 'no-component-to-route',
      severity: 'warn',
      comment: 'Shared components should not import from route-specific code (server actions are allowed).',
      from: { path: '^src/components/' },
      to: { path: '^src/app/.+/', pathNot: '^src/app/actions/' },
    },
    {
      name: 'no-orphans',
      severity: 'info',
      comment: 'Modules that are not imported by anything may be dead code.',
      from: {
        orphan: true,
        pathNot: [
          '\\.(test|spec|stories)\\.(ts|tsx)$',
          '\\.d\\.ts$',
          '(^|/)index\\.ts$',
          '^src/app/',
          'instrumentation\\.ts$',
          'env\\.ts$',
          'test-setup\\.ts$',
          'reset\\.d\\.ts$',
          'proxy\\.ts$',
        ],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};

export default config;
