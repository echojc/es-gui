import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

const rootEl = document.getElementById('root');
let BaseComponent = <App />;

// -- HOT RELOAD SUPPORT -- //
/* tslint:disable */
declare var __DEV__: boolean;
declare var module: { hot: any };
declare var require: { (path: string): any; };
if (__DEV__) {
  const { AppContainer } = require('react-hot-loader');
  BaseComponent = <AppContainer><App /></AppContainer>;

  module.hot.accept('./App', () => {
    const NextApp = require('./App').App;
    ReactDOM.render(<AppContainer><NextApp /></AppContainer>, rootEl);
  });
}
/* tslint:enable */
// -- HOT RELOAD SUPPORT -- //

ReactDOM.render(BaseComponent, rootEl);
