Hooks.once('init', () => {
  console.log('Wargame system initializing');

  class WargameActor extends Actor {
    prepareData() {
      super.prepareData();
      const system = this.system;
      system.move ??= 0;
      system.attack ??= 0;
      system.defense ??= 0;
    }
  }

  CONFIG.Actor.typeLabels = {
    infantry: game.i18n.localize('WARGAME.INFANTRY'),
    cavalry: game.i18n.localize('WARGAME.CAVALRY'),
    artillery: game.i18n.localize('WARGAME.ARTILLERY')
  };

  CONFIG.Actor.documentClass = WargameActor;

  class WargameActorSheet extends ActorSheet {
    /** @override */
    get template() {
      return `systems/${game.system.id}/templates/actor-sheet.html`;
    }
  }

  Actors.registerSheet('wargame', WargameActorSheet, { makeDefault: true });

  Hooks.on('preCreateActor', (actor, data, options, userId) => {
    if (!data.type) {
      data.type = 'infantry';
    }
  });
});

