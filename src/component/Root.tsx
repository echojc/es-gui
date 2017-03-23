import * as React from 'react';

import { state } from '../state';
import { App } from './App';

export class Root extends React.Component<{}, {}> {
  render() {
    return <App state={state} />;
  }
}
