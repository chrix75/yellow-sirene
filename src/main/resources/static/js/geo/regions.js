/**
 * Created by csperandio on 10/01/2017.
 */

var regionsView = new Vue({
    el: '#regions',
    data: {
        alsaceSelected: false,
        aquitaineSelected: false,
        auvergneSelected: false,
        auvergneRhoneAlpesSelected: false,
        basseNormandieSelected: false,
        bourgogneSelected: false,
        bougogneFrancheComteSelected: false,
        francheComteSelected: false,
        bretagneSelected: false,
        centreSelected: false,
        centreValDeLoireSelected: false,
        champagneArdennesSelected: false,
        corseSelected: false,
        grandEstSelected: false,
        hauteNormandieSelected: false,
        hautsDeFranceSelected: false,
        idfSelected: false,
        languedocRoussillonSelected: false,
        limousinSelected: false,
        lorraineSelected: false,
        midiPyreneesSelected: false,
        nordPasDeCalaisSelected: false,
        normandieSelected: false,
        nouvelleAquitaineSelected: false,
        occitanieSelected: false,
        paysDeLaLoireSelected: false,
        picardieSelected: false,
        poitouCharentesSelected: false,
        pacaSelected: false,
        rhoneAlpesSelected: false
    },
    watch: {
        bourgogneSelected: function (checked) {
            if (!checked) {
                this.bougogneFrancheComteSelected = false;
            }
        },
        francheComteSelected: function (checked) {
            if (!checked) {
                this.bougogneFrancheComteSelected = false;
            }
        },
        bougogneFrancheComteSelected: function (checked) {
            if (checked) {
                this.bourgogneSelected = true;
                this.francheComteSelected = true;
            }
        },
        normandieSelected: function (checked) {
            if (checked) {
                this.hauteNormandieSelected = true;
                this.basseNormandieSelected = true;
            }
        },
        hauteNormandieSelected: function (checked) {
            if (!checked) {
                this.normandieSelected = false;
            }
        },
        basseNormandieSelected: function (checked) {
            if (!checked) {
                this.normandieSelected = false;
            }
        },
        grandEstSelected: function (checked) {
            if (checked) {
                this.alsaceSelected = true;
                this.champagneArdennesSelected = true;
                this.lorraineSelected = true;
            }
        },
        alsaceSelected: function (checked) {
            if (!checked) {
                this.grandEstSelected = false;
            }
        },
        champagneArdennesSelected: function (checked) {
            if (!checked) {
                this.grandEstSelected = false;
            }
        },
        lorraineSelected: function (checked) {
            if (!checked) {
                this.grandEstSelected = false;
            }
        },
        nouvelleAquitaineSelected: function (checked) {
            if (checked) {
                this.aquitaineSelected = true;
                this.limousinSelected = true;
                this.poitouCharentesSelected = true;
            }
        },
        aquitaineSelected: function (checked) {
            if (!checked) {
                this.nouvelleAquitaineSelected = false;
            }
        },
        limousinSelected: function (checked) {
            if (!checked) {
                this.nouvelleAquitaineSelected = false;
            }
        },
        poitouCharentesSelected: function (checked) {
            if (!checked) {
                this.nouvelleAquitaineSelected = false;
            }
        },
        hautsDeFranceSelected: function (checked) {
            if (checked) {
                this.nordPasDeCalaisSelected = true;
                this.picardieSelected = true;
            }
        },
        nordPasDeCalaisSelected: function (checked) {
            if (!checked) {
                this.hautsDeFranceSelected = false;
            }
        },
        picardieSelected: function (checked) {
            if (!checked) {
                this.hautsDeFranceSelected = false;
            }
        },
        occitanieSelected: function (checked) {
            if (checked) {
                this.languedocRoussillonSelected = true;
                this.midiPyreneesSelected = true;
            }
        },
        languedocRoussillonSelected: function (checked) {
            if (!checked) {
                this.occitanieSelected = false;
            }
        },
        midiPyreneesSelected: function (checked) {
            if (!checked) {
                this.occitanieSelected = false;
            }
        },
        centreValDeLoireSelected: function (checked, oldState) {
            if (oldState != checked) {
                this.centreSelected = checked;
            }
        },
        centreSelected: function (checked, oldState) {
            if (oldState != checked) {
                this.centreValDeLoireSelected = checked;
            }
        },
        auvergneRhoneAlpesSelected: function (checked) {
            if (checked) {
                this.auvergneSelected = true;
                this.rhoneAlpesSelected = true;
            }
        },
        auvergneSelected: function (checked) {
            if (!checked) {
                this.auvergneRhoneAlpesSelected = false;
            }
        },
        rhoneAlpesSelected: function (checked) {
            if (!checked) {
                this.auvergneRhoneAlpesSelected = false;
            }
        }
    }

});
