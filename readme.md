# stencil-config

This package provides utility functions for creating a set of configurable Stencil components, following best practices.

Ultimately, users of your component library will be able to add the following to their Stencil projects:

#### src/global/app.ts
```ts
import { setupConfig } from 'your-library';

setupConfig({
  logLevel: 'info'
});
```

### Component Authors

First, install the package:

```
npm install stencil-config
```

Then, add the following to your `globalScript` file:

#### src/global/global.ts (or other)
```ts
import { createContextConfig } from 'stencil-config';

declare const Context: any;
Context.config = createContextConfig('my-namespace');
```

In order to allow users of your components to pass their own configuration, we'll need to export a `setupConfig` function.  This takes a few steps, outlined below:

1. Create a `src/utils/config.ts` file. This is where our `setupConfig` function and the options interfaces will be exposed from.

```ts
import { Config as ConfigInterface, createSetupConfig } from 'stencil-config';

// Add your configuration options here
interface MyConfig {
  // Note: persistConfig is used internally by `stencil-config` and should remain
  persistConfig?: boolean;
  // Example setting
  logLevel?: 'debug'|'info'|'warn'|'error';
}

export type Config = ConfigInterface<MyConfig>;
export const setupConfig = createSetupConfig<MyConfig>('my-namespace');
```

2. Create a file at `src/index.ts`. We just need to re-export our `setupConfig` function, so add the following line:

```ts
export * from './utils/config';
```

3. Create a file named `interface.d.ts` in the root of your `src/` directory:
```ts
export * from './components';
export * from './index';
```

4. Update your `package.json` to reflect the new location of your `types` file.
```ts
{
  // Likely changed from "dist/types/components.d.ts"
  "types": "dist/types/interface.d.ts"
}
```

### Consuming the Config

#### my-component.tsx
```tsx
import { Component, Prop } from '@stencil/core';
import { Config } from '../../interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  
  @Prop({ context: 'config' }) config: Config;

  componentWillLoad() {
    console.log(this.config.get('logLevel'));
  }
}

```