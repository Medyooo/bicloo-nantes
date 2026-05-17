import Component from '@glimmer/component';
import StationCard from './station-card';

export default class StationsGrid extends Component {
  
  <template>
    <main class="stations-scroll">
      <ul class="stations-grid">
        {{#each @stations as |station|}}
          <li class="stations-grid__item">
            <StationCard @station={{station}} />
          </li>
        {{else}}
          <li class="stations-empty">Aucune station ne correspond à votre recherche.</li>
        {{/each}}
      </ul>
    </main>
  </template>
}
