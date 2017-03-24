import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import * as HTML5Backend from 'react-dnd-html5-backend';

import { state } from '../state';
import { App } from './App';

export const Root = DragDropContext(HTML5Backend)(class Root extends React.Component<{}, {}> {
  render() {
    return <App state={state} />;
  }
});
