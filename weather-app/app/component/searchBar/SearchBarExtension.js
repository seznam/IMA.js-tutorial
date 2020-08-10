import { AbstractExtension, Router } from '@ima/core';

import SuggestService from 'app/model/suggest/SuggestService';

export default class SearchBarExtension extends AbstractExtension {
  static get $dependencies() {
    return [Router, SuggestService];
  }

  constructor(router, suggestService) {
    super();

    this._router = router;
    this._suggestService = suggestService;
  }

  getAllowedStateKeys() {
    return ['suggestItems', 'suggestItemsLoading'];
  }

  load() {
    return {
      suggestItems: [],
      suggestItemsLoading: false
    };
  }

  onSuggestItemsLoad({ inputValue }) {
    this.setState({ suggestItemsLoading: true });

    this._suggestService.getList(inputValue).then(suggestItems => {
      this.setState({ suggestItems, suggestItemsLoading: false });
    });
  }

  onSuggestItemSelect({ title, lat, lon }) {
    const newPlaceLink = this._router.link('home', {
      location: title,
      lat,
      lon
    });

    this._router.redirect(newPlaceLink);
  }
}
