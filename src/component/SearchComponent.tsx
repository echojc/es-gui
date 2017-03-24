import * as React from 'react';
import { ConnectDragSource, DragSource } from 'react-dnd';

import './searchComponent.less';

interface Props {
  connect: ConnectDragSource;
  label: string;
}

export const SearchComponent = DragSource(
  'SEARCH_COMPONENT',
  { beginDrag: (props: Props) => ({ type: props.label }) },
  (connect, monitor) => ({ connect: connect.dragSource() }),
)(class SearchComponent extends React.Component<Props, {}> {
  render() {
    const { connect, label } = this.props;
    return connect(<div className="search-component">{label}</div>);
  }
});
