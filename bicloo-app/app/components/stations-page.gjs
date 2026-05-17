import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import StationsToolbar from './stations-toolbar';
import StationsGrid from './stations-grid';

export default class StationsPage extends Component {
  @tracked searchQuery = '';
  @tracked filterMode = 'all';

  isStationFull(station) {
    const totalBikeStands = station.bikeStands ?? 0;
    return totalBikeStands > 0 && station.availableBikeStands === 0;
  }

  get filteredStations() {
    let list = this.args.model ? [...this.args.model] : [];
    const normalizedSearch = this.searchQuery.trim().toLowerCase();
    if (normalizedSearch) {
      list = list.filter((station) => {
        const stationName = (station.name ?? '').toLowerCase();
        const streetAddress = (station.address ?? '').toLowerCase();
        return (
          stationName.includes(normalizedSearch) ||
          streetAddress.includes(normalizedSearch)
        );
      });
    }
    if (this.filterMode === 'available') {
      list = list.filter((station) => station.isOpen);
    } else if (this.filterMode === 'full') {
      list = list.filter((station) => this.isStationFull(station));
    }
    return list;
  }

  @action
  updateSearch(event) {
    this.searchQuery = event.target.value;
  }

  @action
  setFilter(mode) {
    this.filterMode = mode;
  }

  <template>
    <div class="app-shell">
      <StationsToolbar
        @searchQuery={{this.searchQuery}}
        @updateSearch={{this.updateSearch}}
        @filterMode={{this.filterMode}}
        @setFilter={{this.setFilter}}
      />
      <StationsGrid @stations={{this.filteredStations}} />
    </div>
  </template>
}
