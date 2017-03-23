import * as React from 'react';

const payload = {
  query: {
    bool: {
      filter: {
        term: {
          fieldName: 'value',
        },
      },
    },
  },
};

export class App extends React.Component<{}, {}> {
  render() {
    return <div>Hello, world!</div>;
  }
}

type Query = Bool | Term;

interface Bool {
  bool: {
    filter: Query | Query[];
  };
}

interface Term {
  term: {
    [field: string]: string;
  };
}

const Query = ({ query }: { query: Query }) => (
  <div className="query">
    {(() => { switch (true) {
    case query.bool:
      return <Bool bool={query.bool} />
    }})()}
  </div>
);

const Bool = ({ bool }: { bool: Bool }) => (
  <div className="bool">
  </div>
);

const Filter = ({ filter }: { filter: { filter: Query | Query[]} }) => (
  <div className="filter">
  </div>
);

const Term = ({ term }: { term: Term }) => (
  <div className="filter">
  </div>
);
