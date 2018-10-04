import Component from '@ember/component';
import layout from '../templates/components/spotlight-search';
import { computed, get } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({

  layout,

  elementId: 'spotlight-wrapper',

  classNameBindings: ['hasOptions'],

  /**
   * The provided placeholder for the spotlight component.
   */
  placeholder: null,

  /**
   * The search term that's entered and then debounced for convinience.
   */
  searchTerm: null,

  /**
   * The user's input in the spotlight component.
   */
  input: null,

  /**
   * The array of options that's passed in by the consumer of the spotlight.
   */
  options: null,

  /**
   * User provided options filtered using the provided (to be implemented) property
   */
  filteredOptions: computed('searchTerm', 'options.[]', function() {
    const { searchTerm, options } = this.getProperties(['searchTerm', 'options']);

    if (!options) return [];

    const matcher = new RegExp(searchTerm, 'gi');

    return options.filter(opt => matcher.test(get(opt, 'key')));
  }),

  /**
   * Determines if we currently have options displayed to the user.
   */
  hasOptions: computed('filteredOptions.[]', function() {
    return this.get('filteredOptions.length') > 0;
  }),

  /**
   * Action that's going to be passed-in to the component
   * in order to handle the selection of an option.
   */
  onSelection() {},

  /**
   * Function used to set the search term, currently only used for debounce purposes.
   * @param {string} term
   */
  applyFilter(term) {
    this.set('searchTerm', term);
  },

  actions: {
    keyUp(input) {
      debounce(this, this.applyFilter, input, 100);
    },

    click(option) {
      this.setProperties({ input: null, searchTerm: null });
      this.get('onSelection')(option);
    }
  }

});
