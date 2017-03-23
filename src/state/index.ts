import { computed, observable } from 'mobx';

import { Query } from './query';

export class State {
  @observable query: Query;
  @computed get toES(): {} {
    return {
      query: this.query ? this.query.toES : { match_all: {} },
    };
  }
}

export const state = new State();

/* tslint:disable */
declare const __DEV__: boolean;
if (__DEV__) {
  window.state = state;
}
/* tslint:enable */
