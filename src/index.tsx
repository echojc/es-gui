import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './component/Root';

const rootEl = document.getElementById('root');
let BaseComponent = <Root />;

// -- HOT RELOAD SUPPORT -- //
/* tslint:disable */
declare var __DEV__: boolean;
declare var module: { hot: any };
declare var require: { (path: string): any; };
if (__DEV__) {
  const { AppContainer } = require('react-hot-loader');
  BaseComponent = <AppContainer><Root /></AppContainer>;

  module.hot.accept('./component/Root', () => {
    const NextRoot = require('./component/Root').Root;
    ReactDOM.render(<AppContainer><NextRoot /></AppContainer>, rootEl);
  });

  const MobXDevTools = require('mobx-react-devtools').default;
  ReactDOM.render(<MobXDevTools />, document.getElementById('dev'));
}
/* tslint:enable */
// -- HOT RELOAD SUPPORT -- //

ReactDOM.render(BaseComponent, rootEl);
