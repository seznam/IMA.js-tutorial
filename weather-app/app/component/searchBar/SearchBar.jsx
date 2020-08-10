import { AbstractComponent } from '@ima/core';
import React from 'react';
import PropTypes from 'prop-types';
import select from '@ima/plugin-select';

const SEARCH_DEBOUNCE_TIME = 250; //ms

class SearchBar extends AbstractComponent {
  static get propTypes() {
    return {
      currentLocation: PropTypes.string,
      suggestItems: PropTypes.array,
      suggestItemsLoading: PropTypes.bool,
      autoFocus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.currentLocation,
      suggestActive: false
    };

    this._searchBarRef = React.createRef();
    this._searchInputRef = React.createRef();
    this._searchTimeout = null;

    this._boundOnSearchOutsizeClick = this.onSearchOutsideClick.bind(this);
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    autoFocus && this._searchInputRef.current.focus();

    document.addEventListener('mouseup', this._boundOnSearchOutsizeClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this._boundOnSearchOutsizeClick);
  }

  render() {
    const { suggestItems, suggestItemsLoading } = this.props;
    const { inputValue, suggestActive } = this.state;

    return (
      <div
        id="search"
        className={this.cssClasses('search-bar')}
        ref={this._searchBarRef}>
        <form
          method="GET"
          className={this.cssClasses('search-bar__container')}
          onSubmit={event => this.onFormSubmit(event)}>
          <input
            ref={this._searchInputRef}
            type="search"
            name="search"
            value={inputValue}
            autoComplete="off"
            className={this.cssClasses('search-bar__input')}
            onFocus={event => this.onInputFocus(event)}
            onChange={event => this.onSearchType(event)}
          />
        </form>
        <ul
          className={this.cssClasses({
            'search-bar__suggest': true,
            'search-bar__suggest--active': suggestActive,
            'search-bar__suggest--loading': suggestItemsLoading
          })}>
          {suggestItems.map(item => this._renderSuggestItem(item))}
        </ul>
      </div>
    );
  }

  _renderSuggestItem(item, index) {
    return (
      <li
        key={`${item.id}_${index}`}
        className={this.cssClasses('search-bar__suggest-item')}
        onClick={event => this.onSuggestItemClick(event, item)}>
        <span className={this.cssClasses('search-bar__suggest-item__name')}>
          {item.title}
        </span>
        <span className={this.cssClasses('search-bar__suggest-item__district')}>
          {item.district}
        </span>
      </li>
    );
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onInputFocus(event) {
    const { currentLocation } = this.props;
    const { inputValue } = this.state;

    if (currentLocation === inputValue) {
      this.setState({ inputValue: '' });
    }
  }

  /**
   * Checks if click happened outside and hide the suggest if so
   *
   * @param {MouseEvent} event
   */
  onSearchOutsideClick(event) {
    const { current: searchBar } = this._searchBarRef;

    if (
      event &&
      event.target &&
      searchBar &&
      (event.target === searchBar ||
        !!(searchBar.compareDocumentPosition(event.target) & 16))
    ) {
      return;
    }

    const { currentLocation } = this.props;
    let { inputValue } = this.state;

    if (currentLocation && inputValue.length === 0) {
      inputValue = currentLocation;
    }

    this.setState({ inputValue, suggestActive: false });
  }

  onSearchType(event) {
    const inputValue = event.target.value;
    clearTimeout(this._searchTimeout);

    if (inputValue.length < 3) {
      this.setState({ inputValue, suggestActive: false });
      return;
    } else {
      this.setState({ inputValue });
    }

    this._searchTimeout = setTimeout(() => {
      this.setState({ suggestActive: true, suggestLoading: true });

      const { inputValue } = this.state;
      this.fire('suggestItemsLoad', { inputValue });
    }, SEARCH_DEBOUNCE_TIME);
  }

  onSuggestItemClick(event, item) {
    event.preventDefault();

    const { title, lat, lon } = item;
    this.fire('suggestItemSelect', { title, lat, lon });
  }
}

const resourcesSelector = state => {
  return {
    key: state.location ? state.location.title : null,
    currentLocation: state.location ? state.location.title : null,
    suggestItems: state.suggestItems
  };
};

export default select(resourcesSelector)(SearchBar);
