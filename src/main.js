import { OSECombatTracker } from "./combat-tracker.js";
import { CANONICAL_NAME, TEMPLATE_PATH } from "./constants.js";
import "./ose-combat-tracker.css";
import { combatTrackerPhases } from "./phases.js";
import { phaseEvents } from "./phase-events.js";

const api = {
    combatTrackerPhases,
    phaseEvents,
}

Hooks.on('init', async () => {
    if (!game.modules.get("petitevue-lib")?.active) {
        ui.notifications.error("PetiteVue is not installed or not active. Please install and activate it to use this module.")
        return
    }
    game.modules.get(CANONICAL_NAME).api = api
    CONFIG.ui.combat = OSECombatTracker;
    CONFIG.ui.combat.combatTrackerPhases = api.combatTrackerPhases
    await loadTemplates({
        combatant: `${TEMPLATE_PATH}/combatant.html`,
    });
});
Hooks.on('setup', async () => {
    Hooks.callAll(`${CANONICAL_NAME}.setup`, api);
});


Hooks.on(`${CANONICAL_NAME}.setup`, async ({ combatTrackerPhases, phaseEvents }) => {
    combatTrackerPhases.add({
        name: game.i18n.localize('OSECOMBATTRACKER.DeclareSpellsAndRetreats'),
        cssClass: 'ose-declare-spells-and-retreats',
    })
    combatTrackerPhases.add({
        name: game.i18n.localize('OSECOMBATTRACKER.Initiative'),
        cssClass: 'ose-initiative',
    })
    combatTrackerPhases.add({
        name: game.i18n.localize('OSECOMBATTRACKER.WinningActs'),
        cssClass: 'ose-winning-acts',
        subPhases: [
            {
                name: game.i18n.localize('OSECOMBATTRACKER.Movement'),
                cssClass: 'ose-movement',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.MissileAttacks'),
                cssClass: 'ose-missile-attacks',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.SpellCasting'),
                cssClass: 'ose-spell-casting',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.MeleeAttacks'),
                cssClass: 'ose-melee-attacks',
            }
        ]
    })
    combatTrackerPhases.add({
        name: game.i18n.localize('OSECOMBATTRACKER.OtherSidesAct'),
        cssClass: 'ose-winning-acts',
        subPhases: [
            {
                name: game.i18n.localize('OSECOMBATTRACKER.Movement'),
                cssClass: 'ose-movement',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.MissileAttacks'),
                cssClass: 'ose-missile-attacks',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.SpellCasting'),
                cssClass: 'ose-spell-casting',
            },
            {
                name: game.i18n.localize('OSECOMBATTRACKER.MeleeAttacks'),
                cssClass: 'ose-melee-attacks',
            }
        ]
    })
    phaseEvents.on('changePhase', (phase) => {
        console.log('changePhase', phase)
    })
});
