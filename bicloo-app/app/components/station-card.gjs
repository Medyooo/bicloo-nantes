import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import { stationScreenIcons } from 'bicloo-app/utils/mdi-icons';
import UiIcon from './ui-icon';



export default class StationCard extends Component {
  stationIcons = stationScreenIcons;

  <template>
    <article class="station-card">
      <LinkTo @route="stations.show" @model={{@station.id}} class="station-card__link">
        <div class="station-card__top">
          <div class="station-card__titles">
            <h2 class="station-card__name">{{@station.name}}</h2>
            {{#if @station.address}}
              <p class="station-card__address">{{@station.address}}</p>
            {{/if}}
          </div>
          {{#if @station.isOpen}}
            <span class="badge badge--open">Ouverte</span>
          {{else}}
            <span class="badge badge--closed">Fermée</span>
          {{/if}}
        </div>

        <div class="station-card__stats">
          <span class="station-stat">
            <span class="station-stat__icon">
              <UiIcon @path={{this.stationIcons.bike}} />
            </span>
            <span class="station-stat__main">
              <span class="station-stat__num">{{@station.availableBikes}}</span>
              <span class="station-stat__unit">vélos</span>
            </span>
          </span>
          <span class="station-stat">
            <span class="station-stat__icon station-stat__icon--p">
              <UiIcon @path={{this.stationIcons.parking}} />
            </span>
            <span class="station-stat__main">
              <span class="station-stat__num">{{@station.availableBikeStands}}</span>
              <span class="station-stat__unit">places</span>
            </span>
          </span>
        </div>
      </LinkTo>
    </article>
  </template>
}
