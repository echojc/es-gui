import { observer } from 'mobx-react';
import * as React from 'react';

import { State } from '../state';
import * as Q from '../state/query';
import { Query } from './Query';
import { SearchComponent } from './SearchComponent';

import './app.less';

@observer
export class App extends React.Component<{ state: State }, {}> {
  render() {
    const { state } = this.props;
    return (
      <main>
        <header>
          <select>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <label>http://localhost:9200</label>
          <input defaultValue="/_search" />
        </header>
        <nav>
          <SearchComponent label="bool" />
          <SearchComponent label="term" />
          <button onClick={() => { state.query = new Q.BoolQuery(state); }}>bool</button>
          <button
            onClick={() => {
              if (state.query && (state.query as Q.BoolQuery).filters) {
                (state.query as Q.BoolQuery).filters.push(new Q.TermQuery(state.query as Q.BoolQuery));
              } else {
                state.query = new Q.TermQuery(state);
              }
            }}
          >term</button>
        </nav>
        <section id="workspace">
          {state.query
          ? <Query q={state.query} />
          : <div>empty</div>
          }
        </section>
        <pre id="es-query">
          {JSON.stringify(state.toES, null, '  ')}
        </pre>
      </main>
    );
  }
}
