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

    function Departement(name, code) {
        this.name = name;
        this.code = code;
        this.selected = false;
        this.regions = [];
    }

    Departement.prototype.selectionChanged = function () {
        _.each(this.regions, function (r) {
            r.updateFilteredState();
        });
    };

    Region.prototype.updateFilteredState = function () {
        var hasSelectedDpt = _.some(this.departements, function (d) {
            return d.selected;
        });
        this.filtred = hasSelectedDpt;
    };

    Region.prototype.addDepartement = function (departement) {
        departement.regions.push(this);
        this.departements.push(departement);
    };

    Region.prototype.selectionChanged = function () {
        if (this.pre2016Regions !== undefined) {
            // the current Region is a 2016 region
            if (this.selected) {
                _.each(this.pre2016Regions, function (r) {
                    r.selected = true;
                });
            }

        } else if (this.region2016 !== undefined) {
            // the current Region is a pre-2016 region

            if (!this.selected) {
                this.region2016.selected = false;
            }
        }
    };

    return {
        newRegion: function (name) {
            return new Region(name);
        },
        newDepartement: function (name, code) {
            return new Departement(name, code);
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
        regionsVisible: false,
        departementsVisible: false,
        showAllDepartements: true,
        regionsAction: 'Afficher',
        departementsAction: 'Afficher',
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
        },
        departements: {
            ain: Regions.newDepartement('Ain', '01'),
            aisne: Regions.newDepartement('Aisne', '02'),
            allier: Regions.newDepartement('Allier', '03'),
            alpesDeHautesProvence: Regions.newDepartement('Alpes de Hautes-Provence', '04'),
            hautesAlpes: Regions.newDepartement('Hautes-Alpes', '05'),
            alpesMaritimes: Regions.newDepartement('Alpes-Maritimes', '06'),
            ardeche: Regions.newDepartement('Ardèche', '07'),
            ardennes: Regions.newDepartement('Ardennes', '08'),
            ariege: Regions.newDepartement('Ariège', '09'),
            aube: Regions.newDepartement('Aube', '10'),
            aude: Regions.newDepartement('Aude', '11'),
            aveyron: Regions.newDepartement('Aveyron', '12'),
            bouchesDuRhone: Regions.newDepartement('Bouches-du-Rhône', '13'),
            calvados: Regions.newDepartement('Calvados', '14'),
            cantal: Regions.newDepartement('Cantal', '15'),
            charente: Regions.newDepartement('Charente', '16'),
            charenteMaritime: Regions.newDepartement('Charente-Maritime', '17'),
            cher: Regions.newDepartement('Cher', '18'),
            correze: Regions.newDepartement('Corrèze', '19'),
            corseSud: Regions.newDepartement('Corse-du-Sud', '2A'),
            hauteCorse: Regions.newDepartement('Haute-Corse', '2B'),
            coteOr: Regions.newDepartement('Côte-d\'Or', '21'),
            cotesArmor: Regions.newDepartement('Côtes d\'Armor', '22'),
            creuse: Regions.newDepartement('Creuse', '23'),
            dordogne: Regions.newDepartement('Dordogne', '24'),
            doubs: Regions.newDepartement('Doubs', '25'),
            drome: Regions.newDepartement('Drôme', '26'),
            eure: Regions.newDepartement('Eure', '27'),
            eureEtLoir: Regions.newDepartement('Eure-et-Loir', '28'),
            finistere: Regions.newDepartement('Finistère', '29'),
            gard: Regions.newDepartement('Gard', '30'),
            hauteGaronne: Regions.newDepartement('Haute-Garonne', '31'),
            gers: Regions.newDepartement('Gers', '32'),
            gironde: Regions.newDepartement('Gironde', '33'),
            herault: Regions.newDepartement('Hérault', '34'),
            illeEtVilaine: Regions.newDepartement('Ille-et-Vilaine', '35'),
            indre: Regions.newDepartement('Indre', '36'),
            indreEtLoire: Regions.newDepartement('Indre-et-Loire', '37'),
            isere: Regions.newDepartement('Isère', '38'),
            jura: Regions.newDepartement('Jura', '39'),
            landes: Regions.newDepartement('Landes', '40'),
            loirEtCher: Regions.newDepartement('Loir-et-Cher', '41'),
            loire: Regions.newDepartement('Loire', '42'),
            hauteLoire: Regions.newDepartement('Haute-Loire', '43'),
            loireAtlantique: Regions.newDepartement('Loire-Atlantique', '44'),
            loiret: Regions.newDepartement('Loiret', '45'),
            lot: Regions.newDepartement('Lot', '46'),
            lotEtGaronne: Regions.newDepartement('Lot-et-Garonne', '47'),
            lozere: Regions.newDepartement('Lozère', '48'),
            maineEtLoire: Regions.newDepartement('Maine-et-Loire', '49'),
            manche: Regions.newDepartement('Manche', '50'),
            marne: Regions.newDepartement('Marne', '51'),
            hauteMarne: Regions.newDepartement('Haute-Marne', '52'),
            mayenne: Regions.newDepartement('Mayenne', '53'),
            meurtheEtMoselle: Regions.newDepartement('Meurthe-et-Moselle', '54'),
            meuse: Regions.newDepartement('Meuse', '55'),
            morbihan: Regions.newDepartement('Morbihan', '56'),
            moselle: Regions.newDepartement('Moselle', '57'),
            nievre: Regions.newDepartement('Nièvre', '58'),
            nord: Regions.newDepartement('Nord', '59'),
            oise: Regions.newDepartement('Oise', '60'),
            orne: Regions.newDepartement('Orne', '61'),
            pasDeCalais: Regions.newDepartement('Pas-de-Calais', '62'),
            puyDeDome: Regions.newDepartement('Puy-de-Dôme', '63'),
            pyreneesAtlantiques: Regions.newDepartement('Pyrénées-Atlantiques', '64'),
            hautesPyrenees: Regions.newDepartement('Hautes-Pyrénées', '65'),
            pyreneesOrientales: Regions.newDepartement('Pyrénées-Orientales', '66'),
            basRhin: Regions.newDepartement('Bas-Rhin', '67'),
            hautRhin: Regions.newDepartement('Haut-Rhin', '68'),
            rhone: Regions.newDepartement('Rhône', '69'),
            hauteSaone: Regions.newDepartement('Haute-Saône', '70'),
            saoneEtLoire: Regions.newDepartement('Saône-et-Loire', '71'),
            sarthe: Regions.newDepartement('Sarthe', '72'),
            savoie: Regions.newDepartement('Savoie', '73'),
            hauteSavoie: Regions.newDepartement('Haute-Savoie', '74'),
            paris: Regions.newDepartement('Paris', '75'),
            seineMaritime: Regions.newDepartement('Seine-Maritime', '76'),
            seineEtMarne: Regions.newDepartement('Seine-et-Marne', '77'),
            yvelines: Regions.newDepartement('Yvelines', '78'),
            deuxSevres: Regions.newDepartement('Deux-Sèvres', '79'),
            somme: Regions.newDepartement('Somme', '80'),
            tarn: Regions.newDepartement('Tarn', '81'),
            tarnEtGaronne: Regions.newDepartement('Tarn-et-Garonne', '82'),
            var: Regions.newDepartement('Var', '83'),
            vaucluse: Regions.newDepartement('Vaucluse', '84'),
            vendee: Regions.newDepartement('Vendée', '85'),
            vienne: Regions.newDepartement('Vienne', '86'),
            hauteVienne: Regions.newDepartement('Haute-Vienne', '87'),
            vosges: Regions.newDepartement('Vosges', '88'),
            yonne: Regions.newDepartement('Yonne', '89'),
            territoireDeBelfort: Regions.newDepartement('Territoire-de-Belfort', '90'),
            essonne: Regions.newDepartement('Essonne', '91'),
            hautsDeSeine: Regions.newDepartement('Hauts-de-Seine', '92'),
            seineSaintDenis: Regions.newDepartement('Seine-Saint-Denis', '93'),
            valDeMarne: Regions.newDepartement('Val-de-Marne', '94'),
            valOise: Regions.newDepartement('Val-d\'Oise', '95')
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

        // Régions Auvergne Rhône Alpes
        this.allocateDepartementsToRegion(this.regions.auvergneRhoneAlpes, [
            this.departements.ain, this.departements.hauteSavoie, this.departements.savoie, this.departements.isere,
            this.departements.drome, this.departements.rhone, this.departements.loire, this.departements.ardeche,
            this.departements.hauteLoire, this.departements.allier, this.departements.puyDeDome, this.departements.cantal]);

        this.allocateDepartementsToRegion(this.regions.rhoneAlpes, [
            this.departements.ain, this.departements.hauteSavoie, this.departements.savoie, this.departements.isere,
            this.departements.drome, this.departements.rhone, this.departements.loire, this.departements.ardeche]);

        this.allocateDepartementsToRegion(this.regions.auvergne, [
            this.departements.hauteLoire, this.departements.allier, this.departements.puyDeDome, this.departements.cantal]);

        // Régions Hauts de France
        this.allocateDepartementsToRegion(this.regions.picardie, [this.departements.aisne, this.departements.oise, this.departements.somme]);
        this.allocateDepartementsToRegion(this.regions.nordPasDeCalais, [this.departements.nord, this.departements.pasDeCalais]);
        this.allocateDepartementsToRegion(this.regions.hautsDeFrance, [this.departements.nord, this.departements.pasDeCalais,
            this.departements.aisne, this.departements.oise, this.departements.somme]);

        // Régions Nouvelle Aquitaine
        this.allocateDepartementsToRegion(this.regions.aquitaine, [this.departements.dordogne, this.departements.gironde,
            this.departements.landes, this.departements.lotEtGaronne, this.departements.pyreneesAtlantiques]);
        this.allocateDepartementsToRegion(this.regions.poitouCharentes, [this.departements.charente, this.departements.charenteMaritime,
            this.departements.vienne, this.departements.deuxSevres]);
        this.allocateDepartementsToRegion(this.regions.limousin, [this.departements.correze, this.departements.creuse,
            this.departements.hauteVienne]);
        this.allocateDepartementsToRegion(this.regions.nouvelleAquitaine, [
            this.departements.dordogne, this.departements.gironde, this.departements.landes, this.departements.lotEtGaronne, this.departements.pyreneesAtlantiques,
            this.departements.charente, this.departements.charenteMaritime, this.departements.vienne, this.departements.deuxSevres,
            this.departements.correze, this.departements.creuse, this.departements.hauteVienne]);

        // Régions Normandie
        this.allocateDepartementsToRegion(this.regions.hauteNormandie, [this.departements.seineMaritime, this.departements.eure]);
        this.allocateDepartementsToRegion(this.regions.basseNormandie, [this.departements.calvados, this.departements.manche, this.departements.orne]);
        this.allocateDepartementsToRegion(this.regions.normandie, [this.departements.seineMaritime, this.departements.eure,
            this.departements.calvados, this.departements.manche, this.departements.orne]);

        // Régions Bourgogne Franche Comté
        this.allocateDepartementsToRegion(this.regions.francheComte, [this.departements.doubs, this.departements.jura,
            this.departements.hauteSaone, this.departements.territoireDeBelfort]);
        this.allocateDepartementsToRegion(this.regions.bourgogne, [this.departements.coteOr, this.departements.nievre,
            this.departements.saoneEtLoire, this.departements.yonne]);

        // Bretagne
        this.allocateDepartementsToRegion(this.regions.bretagne, [this.departements.cotesArmor, this.departements.finistere,
            this.departements.illeEtVilaine, this.departements.morbihan]);

        // Centre
        this.allocateDepartementsToRegion(this.regions.centreValDeLoire, [this.departements.cher, this.departements.eureEtLoir,
            this.departements.indre, this.departements.indreEtLoire, this.departements.loirEtCher, this.departements.loiret]);

        // Régions Grand Est
        this.allocateDepartementsToRegion(this.regions.alsace, [this.departements.basRhin, this.departements.hautRhin, this.departements.territoireDeBelfort]);
        this.allocateDepartementsToRegion(this.regions.lorraine, [this.departements.meurtheEtMoselle, this.departements.meuse, this.departements.moselle, this.departements.vosges]);
        this.allocateDepartementsToRegion(this.regions.champagneArdennes, [this.departements.ardennes, this.departements.aube, this.departements.marne, this.departements.hauteMarne]);
        this.allocateDepartementsToRegion(this.regions.grandEst, [
            this.departements.basRhin, this.departements.hautRhin, this.departements.territoireDeBelfort,
            this.departements.meurtheEtMoselle, this.departements.meuse, this.departements.moselle, this.departements.vosges,
            this.departements.ardennes, this.departements.aube, this.departements.marne, this.departements.hauteMarne
        ]);

        // IDF
        this.allocateDepartementsToRegion(this.regions.idf, [this.departements.paris, this.departements.seineEtMarne,
            this.departements.yvelines, this.departements.essonne, this.departements.hautsDeSeine, this.departements.seineSaintDenis,
            this.departements.valDeMarne, this.departements.valOise]);

        // Régions Occitanie
        this.allocateDepartementsToRegion(this.regions.languedocRoussillon, [this.departements.aude, this.departements.gard,
            this.departements.herault, this.departements.lozere, this.departements.pyreneesOrientales]);
        this.allocateDepartementsToRegion(this.regions.midiPyrenees, [this.departements.ariege, this.departements.aveyron,
            this.departements.hauteGaronne, this.departements.gers, this.departements.lot, this.departements.hautesPyrenees,
            this.departements.tarn, this.departements.tarnEtGaronne]);
        this.allocateDepartementsToRegion(this.regions.occitanie, [this.departements.aude, this.departements.gard,
            this.departements.herault, this.departements.lozere, this.departements.pyreneesOrientales,
            this.departements.ariege, this.departements.aveyron,
            this.departements.hauteGaronne, this.departements.gers, this.departements.lot, this.departements.hautesPyrenees,
            this.departements.tarn, this.departements.tarnEtGaronne]);

        // Pays de la loire
        this.allocateDepartementsToRegion(this.regions.paysDeLaLoire, [this.departements.loireAtlantique, this.departements.maineEtLoire,
            this.departements.mayenne, this.departements.sarthe, this.departements.vendee]);

        // paca
        this.allocateDepartementsToRegion(this.regions.paca, [this.departements.alpesDeHautesProvence, this.departements.hautesAlpes,
            this.departements.alpesMaritimes, this.departements.bouchesDuRhone, this.departements.var, this.departements.vaucluse]);

        // corse
        this.allocateDepartementsToRegion(this.regions.corse, [this.departements.corseSud, this.departements.hauteCorse]);

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
        },
        departementsFromSelectedRegions: function () {
            var selectedRegions = this.findSelectedRegions();
            var dpts = _.sortBy(_.flattenDeep(_.map(selectedRegions, function (r) {
                return r.departements;
            })), function (o) {
                return o.name;
            });

            return _.uniqWith(dpts, function (d1, d2) {
                return d1.name == d2.name;
            });
        },
        departementsGroupA: function () {
            if (this.showAllDepartements) {
                return [this.departements.ain,
                    this.departements.aisne,
                    this.departements.allier,
                    this.departements.alpesDeHautesProvence,
                    this.departements.hautesAlpes,
                    this.departements.alpesMaritimes,
                    this.departements.ardeche,
                    this.departements.ardennes,
                    this.departements.ariege,
                    this.departements.aube,
                    this.departements.aude,
                    this.departements.aveyron,
                    this.departements.bouchesDuRhone,
                    this.departements.calvados,
                    this.departements.cantal,
                    this.departements.charente,
                    this.departements.charenteMaritime,
                    this.departements.cher,
                    this.departements.correze,
                    this.departements.corseSud,
                    this.departements.hauteCorse,
                    this.departements.coteOr,
                    this.departements.cotesArmor,
                    this.departements.creuse,
                    this.departements.dordogne,
                    this.departements.doubs,
                    this.departements.drome,
                    this.departements.eure,
                    this.departements.eureEtLoir,
                    this.departements.finistere,
                    this.departements.gard,
                    this.departements.hauteGaronne];
            } else {
                var blockSize = Math.ceil(this.departementsFromSelectedRegions.length / 3);

                return _.take(this.departementsFromSelectedRegions, blockSize);
            }
        },
        departementsGroupB: function () {
            if (this.showAllDepartements) {
                return [this.departements.gers,
                    this.departements.gironde,
                    this.departements.herault,
                    this.departements.illeEtVilaine,
                    this.departements.indre,
                    this.departements.indreEtLoire,
                    this.departements.isere,
                    this.departements.jura,
                    this.departements.landes,
                    this.departements.loirEtCher,
                    this.departements.loire,
                    this.departements.hauteLoire,
                    this.departements.loireAtlantique,
                    this.departements.loiret,
                    this.departements.lot,
                    this.departements.lotEtGaronne,
                    this.departements.lozere,
                    this.departements.maineEtLoire,
                    this.departements.manche,
                    this.departements.marne,
                    this.departements.hauteMarne,
                    this.departements.mayenne,
                    this.departements.meurtheEtMoselle,
                    this.departements.meuse,
                    this.departements.morbihan,
                    this.departements.moselle,
                    this.departements.nievre,
                    this.departements.nord,
                    this.departements.oise,
                    this.departements.orne,
                    this.departements.pasDeCalais,
                    this.departements.puyDeDome];
            } else {
                var blockSize = Math.ceil(this.departementsFromSelectedRegions.length / 3);

                return _.take(_.drop(this.departementsFromSelectedRegions, blockSize), blockSize);
            }
        },
        departementsGroupC: function () {
            if (this.showAllDepartements) {
                return [this.departements.pyreneesAtlantiques,
                    this.departements.hautesPyrenees,
                    this.departements.pyreneesOrientales,
                    this.departements.basRhin,
                    this.departements.hautRhin,
                    this.departements.rhone,
                    this.departements.hauteSaone,
                    this.departements.saoneEtLoire,
                    this.departements.sarthe,
                    this.departements.savoie,
                    this.departements.hauteSavoie,
                    this.departements.paris,
                    this.departements.seineMaritime,
                    this.departements.seineEtMarne,
                    this.departements.yvelines,
                    this.departements.deuxSevres,
                    this.departements.somme,
                    this.departements.tarn,
                    this.departements.tarnEtGaronne,
                    this.departements.var,
                    this.departements.vaucluse,
                    this.departements.vendee,
                    this.departements.vienne,
                    this.departements.hauteVienne,
                    this.departements.vosges,
                    this.departements.yonne,
                    this.departements.territoireDeBelfort,
                    this.departements.essonne,
                    this.departements.hautsDeSeine,
                    this.departements.seineSaintDenis,
                    this.departements.valDeMarne,
                    this.departements.valOise];
            } else {
                var blockSize = Math.ceil(this.departementsFromSelectedRegions.length / 3);

                return _.drop(this.departementsFromSelectedRegions, 2 * blockSize);
            }
        }
    },
    methods: {
        allocateDepartementsToRegion: function (reg, dpts) {
            _.each(dpts, function (d) {
                reg.addDepartement(d);
            })
        },
        findSelectedRegions: function () {
            var allRegions = [this.regions.alsace,
                this.regions.aquitaine,
                this.regions.auvergne,
                this.regions.auvergneRhoneAlpes,
                this.regions.basseNormandie,
                this.regions.bourgogne,
                this.regions.bougogneFrancheComte,
                this.regions.francheComte,
                this.regions.bretagne,
                this.regions.centreValDeLoire,
                this.regions.champagneArdennes,
                this.regions.corse,
                this.regions.grandEst,
                this.regions.hauteNormandie,
                this.regions.hautsDeFrance,
                this.regions.idf,
                this.regions.languedocRoussillon,
                this.regions.limousin,
                this.regions.lorraine,
                this.regions.midiPyrenees,
                this.regions.nordPasDeCalais,
                this.regions.normandie,
                this.regions.nouvelleAquitaine,
                this.regions.occitanie,
                this.regions.paysDeLaLoire,
                this.regions.picardie,
                this.regions.poitouCharentes,
                this.regions.paca,
                this.regions.rhoneAlpes];

            return _.filter(allRegions, function (r) {
                return r.selected;
            });
        },
        toggleDisplayRegions: function () {
            this.regionsVisible = !this.regionsVisible;

            if (this.regionsVisible) {
                this.regionsAction = 'Masquer';
            } else {
                this.regionsAction = 'Afficher';
            }
        },
        toggleDisplayDepartements: function () {
            this.departementsVisible = !this.departementsVisible;

            if (this.departementsVisible) {
                this.departementsAction = 'Masquer';
                this.showAllDepartements = true;
            } else {
                this.departementsAction = 'Afficher';
            }
        },
        toggleDisplayFiltredDepartements: function () {
            this.departementsVisible = !this.departementsVisible;

            if (this.departementsVisible) {
                this.departementsAction = 'Masquer';
                this.showAllDepartements = false;
            } else {
                this.departementsAction = 'Afficher';
            }
        },
        toggleRegion: function (reg) {
            reg.selectionChanged();
        }
    }

});
