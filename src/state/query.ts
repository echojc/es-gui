import { computed, observable } from 'mobx';

export type Query = TermQuery
                  | BoolQuery;

export class TermQuery {
  readonly id = 'term';
  @observable fieldName: string;
  @observable value: string;
  @computed get toES(): {} {
    return {
      term: { [this.fieldName]: this.value },
    };
  }
}

export class BoolQuery {
  readonly id = 'bool';
  @observable filters: Query[];
  @computed get toES(): {} {
    return {
      bool: {
        filter: this.filters.map(_ => _.toES),
      },
    };
  }
}
