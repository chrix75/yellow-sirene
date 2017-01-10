/**
 * WARNING: NEEDS THE LODASH LIBRARY.
 *
 * Created by csperandio on 10/01/2017.
 */

var Regions = function () {
    function Region(name) {
        this.name = name;
        this.selected = false;
        this.filtred = false;
        this.departements = [];
    }

    function Departement(name) {
        this.name = name;
        this.selected = false;
        this.regions = [];
    }

    Departement.prototype.select = function(selected) {
        this.selected = selected;
        _.each(this.regions, function (r) { r.updateFilteredState(); });
    };

    Region.prototype.updateFilteredState = function () {
        var hasSelectedDpt = _.some(this.departements, function (d) { return d.selected; });
        this.filtred = hasSelectedDpt;
    };

    Region.prototype.addDepartement = function (departement) {
        departement.regions.push(this);
        this.departements.push(departement);
    };

    Region.prototype.select = function (selected) {
        this.selected = selected;

        if (this.pre2016Regions !== undefined) {
            // the current Region is a 2016 region
            if (selected) {
                _.each(this.pre2016Regions, function (r) {
                    r.select(true);
                });
            }

        } else if (this.region2016 !== undefined) {
            // the current Region is a pre-2016 region

            if (!selected) {
                this.region2016.select(false);
            }
        }
    };

    return {
        newRegion: function (name) {
            return new Region(name);
        },
        defineRegion2016: function (newRegion, oldRegions) {
            newRegion.pre2016Regions = oldRegions;
            _.each(oldRegions, function (r) {
                r.region2016 = newRegion;
            })
        }
    }
}();



var geoView = new Vue({
    el: '#geo',
    data: {
        visible: false,
        action: 'Afficher',
        regions: {
            alsace: Regions.newRegion('Alsace'),
            aquitaine: Regions.newRegion('Aquitaine'),
            auvergne: Regions.newRegion('Auvergne'),
            auvergneRhoneAlpes: Regions.newRegion('Auvergne-Rhône Alpes'),
            basseNormandie: Regions.newRegion('Basse Normandie'),
            bourgogne: Regions.newRegion('Bourgogne'),
            bougogneFrancheComte: Regions.newRegion('Bourgogne-Franche-Comté'),
            francheComte: Regions.newRegion('Franche-Comté'),
            bretagne: Regions.newRegion('Bretagne'),
            centreValDeLoire: Regions.newRegion('Centre-Val-de-Loire'),
            champagneArdennes: Regions.newRegion('Champagne-Ardennes'),
            corse: Regions.newRegion('Corse'),
            grandEst: Regions.newRegion('Grand Est'),
            hauteNormandie: Regions.newRegion('Haute-Normandie'),
            hautsDeFrance: Regions.newRegion('Hauts-de-France'),
            idf: Regions.newRegion('Ile-de-France'),
            languedocRoussillon: Regions.newRegion('Languedoc-Roussillon'),
            limousin: Regions.newRegion('Limousin'),
            lorraine: Regions.newRegion('Lorraine'),
            midiPyrenees: Regions.newRegion('Midi-Pyrénées'),
            nordPasDeCalais: Regions.newRegion('Nord-Pas-de-Calais'),
            normandie: Regions.newRegion('Normandie'),
            nouvelleAquitaine: Regions.newRegion('Nouvelle Aquitaine'),
            occitanie: Regions.newRegion('Occitanie'),
            paysDeLaLoire: Regions.newRegion('Pays-de-la-Loire'),
            picardie: Regions.newRegion('Picardie'),
            poitouCharentes: Regions.newRegion('Poitou-Charentes'),
            paca: Regions.newRegion('Provence-Alpes-Côte-d\'Azur'),
            rhoneAlpes: Regions.newRegion('Rhône-Alpes')
        }
    },
    created: function () {
        Regions.defineRegion2016(this.regions.bougogneFrancheComte, [this.regions.bourgogne, this.regions.francheComte]);
        Regions.defineRegion2016(this.regions.grandEst, [this.regions.lorraine, this.regions.alsace, this.regions.champagneArdennes]);
        Regions.defineRegion2016(this.regions.normandie, [this.regions.hauteNormandie, this.regions.basseNormandie]);
        Regions.defineRegion2016(this.regions.nouvelleAquitaine, [this.regions.aquitaine, this.regions.limousin, this.regions.poitouCharentes]);
        Regions.defineRegion2016(this.regions.hautsDeFrance, [this.regions.picardie, this.regions.nordPasDeCalais]);
        Regions.defineRegion2016(this.regions.occitanie, [this.regions.languedocRoussillon, this.regions.midiPyrenees]);
        Regions.defineRegion2016(this.regions.auvergneRhoneAlpes, [this.regions.auvergne, this.regions.rhoneAlpes]);
    },
    computed: {
        hasSelectedRegion: function () {
            return this.regions.alsace.selected ||
                this.regions.aquitaine.selected ||
                this.regions.auvergne.selected ||
                this.regions.auvergneRhoneAlpes.selected ||
                this.regions.basseNormandie.selected ||
                this.regions.bourgogne.selected ||
                this.regions.bougogneFrancheComte.selected ||
                this.regions.francheComte.selected ||
                this.regions.bretagne.selected ||
                this.regions.centreValDeLoire.selected ||
                this.regions.champagneArdennes.selected ||
                this.regions.corse.selected ||
                this.regions.grandEst.selected ||
                this.regions.hauteNormandie.selected ||
                this.regions.hautsDeFrance.selected ||
                this.regions.idf.selected ||
                this.regions.languedocRoussillon.selected ||
                this.regions.limousin.selected ||
                this.regions.lorraine.selected ||
                this.regions.midiPyrenees.selected ||
                this.regions.nordPasDeCalais.selected ||
                this.regions.normandie.selected ||
                this.regions.nouvelleAquitaine.selected ||
                this.regions.occitanie.selected ||
                this.regions.paysDeLaLoire.selected ||
                this.regions.picardie.selected ||
                this.regions.poitouCharentes.selected ||
                this.regions.paca.selected ||
                this.regions.rhoneAlpes.selected;
        }
    },
    methods: {
        toggleDisplay: function () {
            this.visible = !this.visible;

            if (this.visible) {
                this.action = 'Masquer';
            } else {
                this.action = 'Afficher';
            }
        },
        toggleRegion: function (reg) {
            reg.select(!reg.selected);
        }
    }

});
