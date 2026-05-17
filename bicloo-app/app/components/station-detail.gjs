import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import { stationScreenIcons } from 'bicloo-app/utils/mdi-icons';
import UiIcon from './ui-icon';


function relativeFromIso(isoTimestamp) {
  if (!isoTimestamp) {
    return '—';
  }
  const parsedTimeMs = new Date(isoTimestamp).getTime();
  if (Number.isNaN(parsedTimeMs)) {
    return '—';
  }
  const elapsedMinutes = Math.floor((Date.now() - parsedTimeMs) / 60000);
  if (elapsedMinutes < 1) {
    return "Mis à jour à l'instant";
  }
  if (elapsedMinutes < 60) {
    return `Mis à jour il y a ${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''}`;
  }
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 48) {
    return `Mis à jour il y a ${elapsedHours} heure${elapsedHours > 1 ? 's' : ''}`;
  }
  const elapsedDays = Math.floor(elapsedHours / 24);
  return `Mis à jour il y a ${elapsedDays} jour${elapsedDays > 1 ? 's' : ''}`;
}

export default class StationDetail extends Component {
  stationIcons = stationScreenIcons;

  get capacityPercent() {
    const totalBikeStands = this.args.model?.bikeStands ?? 0;
    const availableBikes = this.args.model?.availableBikes ?? 0;
    if (!totalBikeStands) {
      return 0;
    }
    return Math.min(
      100,
      Math.round((availableBikes / totalBikeStands) * 100),
    );
  }

  get bikesCapacityLabel() {
    const availableBikes = this.args.model?.availableBikes ?? 0;
    const totalBikeStands = this.args.model?.bikeStands;
    return `${availableBikes} / ${totalBikeStands} vélos disponibles`;
  }

  get relativeUpdate() {
    return relativeFromIso(this.args.model?.lastUpdate);
  }

  <template>
    <div class="detail-screen">
      <header class="detail-hero">
        <nav class="detail-hero__nav">
          <LinkTo @route="stations" class="detail-back">
            <UiIcon @path={{this.stationIcons.arrowLeft}} class="detail-back__icon" />
            Retour
          </LinkTo>
        </nav>
        <h1 class="detail-hero__title">{{@model.name}}</h1>
        <p class="detail-hero__subtitle">{{@model.address}}</p>
      </header>

      <div class="detail-body">
        <section class="detail-quick-stats">
          <div class="quick-stat-card">
            <span class="quick-stat-card__icon">
              <UiIcon @path={{this.stationIcons.bike}} />
            </span>
            <span class="quick-stat-card__value">{{@model.availableBikes}}</span>
            <span class="quick-stat-card__label">Vélos</span>
          </div>
          <div class="quick-stat-card">
            <span class="quick-stat-card__icon quick-stat-card__icon--p">
              <UiIcon @path={{this.stationIcons.parking}} />
            </span>
            <span class="quick-stat-card__value">{{@model.availableBikeStands}}</span>
            <span class="quick-stat-card__label">Places</span>
          </div>
          <div class="quick-stat-card quick-stat-card--status">
            {{#if @model.isOpen}}
              <span class="quick-stat-card__icon quick-stat-card__icon--ok">
                <UiIcon @path={{this.stationIcons.check}} />
              </span>
              <span class="quick-stat-card__value quick-stat-card__value--open">Ouverte</span>
            {{else}}
              <span class="quick-stat-card__icon quick-stat-card__icon--bad">
                <UiIcon @path={{this.stationIcons.close}} />
              </span>
              <span class="quick-stat-card__value quick-stat-card__value--closed">Fermée</span>
            {{/if}}
            <span class="quick-stat-card__label">Statut</span>
          </div>
        </section>

        <section class="detail-capacity">
          <p class="detail-capacity__label">Capacité totale</p>
          <div
            class="capacity-bar"
            role="progressbar"
            aria-valuenow={{this.capacityPercent}}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="capacity-bar__fill" style="width: {{this.capacityPercent}}%"></div>
          </div>
          <p class="detail-capacity__hint">{{this.bikesCapacityLabel}}</p>
        </section>

        <section class="detail-info-card">
          <p class="detail-info-row">
            <span class="detail-info-row__icon">
              <UiIcon @path={{this.stationIcons.mapMarker}} />
            </span>
            {{@model.address}}
          </p>
          <p class="detail-info-row">
            <span class="detail-info-row__icon">
              <UiIcon @path={{this.stationIcons.sync}} />
            </span>
            {{this.relativeUpdate}}
          </p>
          <p class="detail-info-row">
            <span class="detail-info-row__icon">
              <UiIcon @path={{this.stationIcons.identifier}} />
            </span>
            Station #{{@model.id}}
          </p>
        </section>
      </div>
    </div>
  </template>
}
