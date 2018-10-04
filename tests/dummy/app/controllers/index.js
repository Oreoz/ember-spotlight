import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({

  options: computed(function() {
    return A([
      { id: 1, key: 'Lorem' },
      { id: 2, key: 'Ipsum' },
      { id: 3, key: 'Dolor' },
      { id: 4, key: 'Sit' },
      { id: 5, key: 'Amet' },
    ]);
  }),

  actions: {
    spotlight(/* item */) {
      // TODO:
    }
  }

});
