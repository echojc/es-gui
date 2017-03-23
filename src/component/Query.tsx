import { observer } from 'mobx-react';
import * as React from 'react';

import * as Q from '../state/query';

@observer
export class Query extends React.Component<{ q: Q.Query }, {}> {
  render(): JSX.Element {
    const { q } = this.props;
    if (q) {
      switch (q.id) {
        case 'term': return <Term q={q} />;
        case 'bool': return <Bool q={q} />;
        default:
          const n: never = q;
          return n;
      }
    } else {
      return <div>empty</div>;
    }
  }
}

@observer
export class Term extends React.Component<{ q: Q.TermQuery }, {}> {
  render() {
    const { q } = this.props;
    return (
      <section className="query term">
        <h1>Term</h1>
        <select>
          <option>{q.fieldName}</option>
        </select>
        <input value={q.value || ''} onChange={e => q.value = (e.target as HTMLInputElement).value} />
      </section>
    );
  }
}

@observer
export class Bool extends React.Component<{ q: Q.BoolQuery }, {}> {
  render() {
    const { q } = this.props;
    return (
      <section className="query bool">
        <h1>Bool</h1>
        <section>
          <h2>Filters</h2>
          {q.filters.map((_, i) => <Query key={i} q={_} />)}
        </section>
      </section>
    );
  }
}
