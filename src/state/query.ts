import { computed, observable } from 'mobx';

const nextId = (() => { let id = 0; return () => id++; })();

export type Query = TermQuery
                  | BoolQuery;

interface Parent {
  removeDirectChild(child: Query): void;
}

export class TermQuery {
  readonly type = 'term';
  readonly id = nextId();
  constructor(readonly parent: Parent) {}
  @observable fieldName = '';
  @observable value = '';
  @computed get toES(): {} {
    return {
      term: { [this.fieldName]: this.value },
    };
  }
}

export class BoolQuery {
  readonly type = 'bool';
  readonly id = nextId();
  constructor(readonly parent: Parent) {}
  @observable filters: Query[] = [];
  @computed get toES(): {} {
    return {
      bool: {
        filter: this.filters.map(_ => _.toES),
      },
    };
  }
  removeDirectChild(child: Query): void {
    const idx = this.filters.indexOf(child);
    if (idx >= 0) {
      this.filters.splice(idx, 1);
    }
  }
}
