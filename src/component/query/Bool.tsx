import { observer } from 'mobx-react';
import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from 'react-dnd';

import * as Q from '../../state/query';
import { Query } from '../Query';

interface Props {
  connect: ConnectDropTarget;
  q: Q.BoolQuery;
}

export const Bool = DropTarget(
  'SEARCH_COMPONENT',
  {
    drop: (props: Props, monitor: DropTargetMonitor) => {
      const { type } = monitor.getItem() as Q.Query;
      switch (type) {
        case 'term':
          props.q.filters.push(new Q.TermQuery(props.q));
          break;
        case 'bool':
          props.q.filters.push(new Q.BoolQuery(props.q));
          break;
        default:
          const n: never = type;
          return n;
      }
    },
    canDrop: (_, monitor: DropTargetMonitor) => monitor.isOver({ shallow: true }),
  },
  (connect, monitor) => ({ connect: connect.dropTarget(), isOver: monitor.isOver({ shallow: true }) }),
)(observer(class Bool extends React.Component<Props, {}> {
  render() {
    const { connect, q } = this.props;
    return (
      <section className="query bool">
        <div onClick={() => q.parent.removeDirectChild(q)}>X</div>
        <h1>Bool</h1>
        {connect(
          <section>
            <h2>Filters</h2>
            {q.filters.length > 0
            ? q.filters.map((_, i) => <Query key={_.id} q={_} />)
            : 'empty'
            }
          </section>,
        )}
      </section>
    );
  }
}));
