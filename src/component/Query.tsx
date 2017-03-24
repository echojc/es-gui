import { observer } from 'mobx-react';
import * as React from 'react';

import * as Q from '../state/query';
import { Bool } from './query/Bool';

import './query.less';

@observer
export class Query extends React.Component<{ q: Q.Query }, {}> {
  render(): JSX.Element {
    const { q } = this.props;
    switch (q.type) {
      case 'term': return <Term q={q} />;
      case 'bool': return <Bool q={q} />;
      default:
        const n: never = q;
        return n;
    }
  }
}

@observer
export class Term extends React.Component<{ q: Q.TermQuery }, {}> {
  render() {
    const { q } = this.props;
    return (
      <section className="query term">
        <div onClick={() => q.parent.removeDirectChild(q)}>X</div>
        <h1>Term</h1>
        <select>
          <option>{q.fieldName}</option>
        </select>
        <input value={q.value || ''} onChange={e => q.value = (e.target as HTMLInputElement).value} />
      </section>
    );
  }
}
