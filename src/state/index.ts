import { computed, observable } from 'mobx';

import { Query } from './query';

export class State {
  @observable query: Nullable<Query> = null;
  @computed get toES(): {} {
    return {
      query: this.query ? this.query.toES : { match_all: {} },
    };
  }
  removeDirectChild(_: Query) {
    this.query = null;
  }
}

export const state = new State();

/* tslint:disable */
declare const __DEV__: boolean;
if (__DEV__) {
  window.state = state;
}
/* tslint:enable */
