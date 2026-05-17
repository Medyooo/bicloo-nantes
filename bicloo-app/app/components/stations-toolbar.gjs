import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { stationScreenIcons } from 'bicloo-app/utils/mdi-icons';
import UiIcon from './ui-icon';

export default class StationsToolbar extends Component {
  stationIcons = stationScreenIcons;

  get isFilterAll() {
    return this.args.filterMode === 'all';
  }

  get isFilterAvailable() {
    return this.args.filterMode === 'available';
  }

  get isFilterFull() {
    return this.args.filterMode === 'full';
  }

  <template>
    <header class="app-header">
      <div class="app-header__brand">
        <span class="app-header__icon">
          <UiIcon @path={{this.stationIcons.bike}} />
        </span>
        <span class="app-header__title">Bicloo Nantes</span>
      </div>

      <label class="search-field">
        <span class="search-field__icon">
          <UiIcon @path={{this.stationIcons.magnify}} />
        </span>
        <input
          type="search"
          class="search-field__input"
          placeholder="Rechercher une station..."
          value={{@searchQuery}}
          {{on "input" @updateSearch}}
        />
      </label>

      <div class="filter-chips" role="group" aria-label="Filtrer les stations">
        <button
          type="button"
          class="filter-chip {{if this.isFilterAll 'filter-chip--active'}}"
          {{on "click" (fn @setFilter 'all')}}
        >
          Toutes
        </button>
        <button
          type="button"
          class="filter-chip {{if this.isFilterAvailable 'filter-chip--active'}}"
          {{on "click" (fn @setFilter 'available')}}
        >
          Disponibles
        </button>
        <button
          type="button"
          class="filter-chip {{if this.isFilterFull 'filter-chip--active'}}"
          {{on "click" (fn @setFilter 'full')}}
        >
          Pleines
        </button>
      </div>
    </header>
  </template>
}
