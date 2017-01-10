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
    }

    Region.prototype.select = function (selected) {
        this.selected = selected;

        if (this.pre2016Regions !== undefined) {
            // the current Region is a 2016 region
            if (selected) {
                _.each(this.pre2016Regions, function(r) { r.select(true); });
            }

        } else if (this.region2016 !== undefined) {
            // the current Region is a pre-2016 region

            if (!selected) {
                this.region2016.select(false);
            }
        }
    };

    return {
        newRegion: function(name) {
            return new Region(name);
        },
        defineRegion2016: function (newRegion, oldRegions) {
            newRegion.pre2016Regions = oldRegions;
            _.each(oldRegions, function(r) { r.region2016 = newRegion; })
        }
    }
}();

var geoView = new Vue({
    el: '#geo',
    data: {
        visible: false,
        action: 'Afficher',
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
    },
    created: function() {
        Regions.defineRegion2016(this.bougogneFrancheComte, [this.bourgogne, this.francheComte]);
        Regions.defineRegion2016(this.grandEst, [this.lorraine, this.alsace, this.champagneArdennes]);
        Regions.defineRegion2016(this.normandie, [this.hauteNormandie, this.basseNormandie]);
        Regions.defineRegion2016(this.nouvelleAquitaine, [this.aquitaine, this.limousin, this.poitouCharentes]);
        Regions.defineRegion2016(this.hautsDeFrance, [this.picardie, this.nordPasDeCalais]);
        Regions.defineRegion2016(this.occitanie, [this.languedocRoussillon, this.midiPyrenees]);
        Regions.defineRegion2016(this.auvergneRhoneAlpes, [this.auvergne, this.rhoneAlpes]);
    },
    computed: {
        hasSelectedRegion: function () {
            return this.alsace.selected ||
                this.aquitaine.selected ||
                this.auvergne.selected ||
                this.auvergneRhoneAlpes.selected ||
                this.basseNormandie.selected ||
                this.bourgogne.selected ||
                this.bougogneFrancheComte.selected ||
                this.francheComte.selected ||
                this.bretagne.selected ||
                this.centreValDeLoire.selected ||
                this.champagneArdennes.selected ||
                this.corse.selected ||
                this.grandEst.selected ||
                this.hauteNormandie.selected ||
                this.hautsDeFrance.selected ||
                this.idf.selected ||
                this.languedocRoussillon.selected ||
                this.limousin.selected ||
                this.lorraine.selected ||
                this.midiPyrenees.selected ||
                this.nordPasDeCalais.selected ||
                this.normandie.selected ||
                this.nouvelleAquitaine.selected ||
                this.occitanie.selected ||
                this.paysDeLaLoire.selected ||
                this.picardie.selected ||
                this.poitouCharentes.selected ||
                this.paca.selected ||
                this.rhoneAlpes.selected;
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
        toggleRegion: function(reg) {
            reg.select(!reg.selected);
        }
    }

});
