import { observer } from 'mobx-react';
import * as React from 'react';

import { State } from '../state';
import * as Q from '../state/query';
import { Query } from './Query';

@observer
export class App extends React.Component<{ state: State }, {}> {
  render() {
    const { state } = this.props;
    return (
      <div>
        <main id="workspace">
          <Query q={state.query} />
        </main>
        <button onClick={() => console.log(JSON.stringify(state.toES))}>click me</button>
        <button onClick={() => {
          state.query = new Q.TermQuery();
        }}>term</button>
      </div>
    );
  }
}
