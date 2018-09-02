function compare(a,b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
    }
    var app = new Vue({
    el: '#app',
  
    methods: {
        gerargrafo(){
            this.layouttipo = 0
        },

        tudo(){
            BLACK = '#2B1B17'
            var listateste = []
            var nodes = new vis.DataSet([]);
            for(var j = 0; j < this.nomeLista.length; j++){
                nodes.add({id: j+1,font:{size:40}, label: this.nomeLista[j], shape: 'square'});
            }
            var edges = new vis.DataSet([
            ]);


            var maiorvalor = 0;
            for(var i = 0; i < this.resultado.length; i++){
                if(this.resultado[i][2]>maiorvalor)
                maiorvalor = this.resultado[i][2];
            }
            this.maxvalue = maiorvalor;
            if(this.maxvalue<200)
            this.maxvalue=200;

            for(var i = 0; i < this.resultado.length; i++){
                var pri = 0,
                seg =0;

                for(var j = 0; j < this.nomeLista.length; j++){
                    if(this.resultado[i][0] == this.nomeLista[j] ){
                        pri = j+1;
                        break;
                    }
                }
                for(var j = 0; j < this.nomeLista.length; j++){
                    if(this.resultado[i][1] == this.nomeLista[j] ){
                        seg = j+1;
                        break;
                    }
                }
                
                if(this.resultado[i][2]>1){
                 var distancia = (this.maxvalue*this.valormulti + this.maxvalue*this.valormulti*0.01) - this.resultado[i][2]*this.valormulti;
                 //console.log(pri,seg);
                 //console.log(distancia);
                 edges.add({from: pri, to: seg,selectionWidth: 40, length: distancia,fontSize: 50, color:{color:'blue', highlight:'red'}, fontColor: BLACK, 
                         });
                }
                
            }
            var container = document.getElementById('mynetwork');
            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                height: '100%',
                width: '100%',
                edges: {
                    color: BLACK,
                    smooth: false
                },
                nodes: {
                    font: {
                    size: 20,
                    }
                },
                layout: {
                    improvedLayout:false,
                },
                physics: {
                    barnesHut: {
                        gravitationalConstant: -100000,
                        centralGravity: 0,
                        springLength: 0,
                        damping: 0.76,
                        avoidOverlap: 0.77
                    },
                    maxVelocity: 36,
                    minVelocity: 1,
                    timestep: 0.86
                }
            };
            this.booleantabela = false;
            console.log('sadasd');
            this.network = new vis.Network(container, data, options);
            console.log('sadasd');
            
        },
        ListarNomes(){
            if(!this.flagcarregador){
            var nomescompleto = []
            for(var i = 0; i < this.resultado.length; i++){
                nomescompleto.push(this.resultado[i][0]);
                nomescompleto.push(this.resultado[i][1]);
            };
            nomescompleto.sort(compare);
            for(var i = 0; i < nomescompleto.length; i++){
                if(i+1 <nomescompleto.length){
                    if(nomescompleto[i] == nomescompleto[i+1] ){
                        nomescompleto.splice(i+1, 1);
                        i--;
                    }
                }
            }
            // for(var i = 0; i < nomescompleto.length; i++){
            //     console.log(nomescompleto[i]);
            // }
            this.nomeLista = nomescompleto;
            this.flagcarregador=true;
        }
        },

        DesenharNo(){
            this.layouttipo =1;
            this.escolherRaiz();
            this.message = "bost";
            var LENGTH_MAIN = 50,
            BLACK = '#2B1B17';
            var nofont = this.maxvalue*0.1;
            var arestafont = (this.maxvalue*0.1)/2;
            var nodes = new vis.DataSet([
                 {id: 1,font:{size:nofont}, label: this.raiz, shape: 'dot'},
            ]);
            var edges = new vis.DataSet([
            ]);

            


            for(var i = 0; i < this.lista.length; i++){
                nodes.add({id: i+2,font:{size:nofont}, label: this.lista[i][0], shape: 'square'});
                var distancia = (this.maxvalue*this.valormulti + this.maxvalue*this.valormulti*0.01) - this.lista[i][1]*this.valormulti;
                
                edges.add({from: 1, to: i+2, length: distancia,font:{size:arestafont}, color: BLACK, fontColor: BLACK, 
                label: ''+this.lista[i][1]});
            }
            var container = document.getElementById('mynetwork');
            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                height: '100%',
                width: '100%',
                edges: {
                    color: BLACK,
                    smooth: false
                },
                nodes: {
                    font: {
                    size: 20,
                    }
                },
                layout: {
                    randomSeed: 10,
                },
                physics: {
                    barnesHut: {
                        gravitationalConstant: -1000000,
                        centralGravity: 0,
                        springLength: 0,
                        damping: 0.76,
                        avoidOverlap: 0.77
                    },
                    maxVelocity: 36,
                    minVelocity: 1,
                    timestep: 0.86
                }
            };
            this.booleantabela = true;
            this.network = new vis.Network(container, data, options);
        },
        escolherRaiz(){
            var grupos = [];
            for(var i = this.resultado.length-1; i >= 0; i--){
                if(this.raiz == this.resultado[i][0]){
                    grupos.push([this.resultado[i][1],this.resultado[i][2]]);
                }
                if(this.raiz == this.resultado[i][1]){
                    grupos.push([this.resultado[i][0],this.resultado[i][2]]);
                }
            }
            var maiorvalor = 0;
            for(var i = 0; i < grupos.length; i++){
                if(grupos[i][1]>maiorvalor)
                maiorvalor = grupos[i][1];
            }
            this.maxvalue = maiorvalor;
            if(this.maxvalue<200)
            this.maxvalue=200;
            this.lista= grupos;
        },

    },
    data: {
        layouttipo: 1,
        pontentagem: 0,
        flagcarregador: false,
        nomeLista: [],
        booleantabela: false,
        valormulti: 5,
        maxvalue:  'Hello Vue!',
        raiz: "welton",
        lista: [
            ["eduardo_pagani_julio", 100],
            ["artur_ziviani", 300],
            ["daniel_sadoc_menasche", 250],
            ["celso_alberto_saibel_santos", 200],
            ["c_a_c_teixeira", 100],
            ["raul_fonseca_neto", 300],
            ["jussara_almeida", 500],
            ["italo_cunha", 500],
        ],
        resultado: [
       ["luiz_alberto_batista" , "tamotsu_hirata" , 3] ,
["luiz_alberto_batista" , "luiz_heleno_moreira_duque" , 3] ,
["luiz_alberto_batista" , "jose_elias_tomazini" , 3] ,
["anibal_alberto_vilcapoma_ignacio" , "iara_tamella" , 3] ,
["gilson_brito_alves_lima" , "luiz_heleno_moreira_duque" , 3] ,
["gilson_brito_alves_lima" , "carmen_lucia_campos_guizze" , 3] ,
["gilson_brito_alves_lima" , "livia_cavalcanti_figueiredo" , 3] ,
["luiz_heleno_moreira_duque" , "livia_cavalcanti_figueiredo" , 3] ,
["elton_fernandes" , "edwin_benito_mitacc_meza" , 3] ,
["ricardo_dos_santos_ferreira" , "elizabeth_pacheco_batista_fontes" , 3] ,
["ricardo_dos_santos_ferreira" , "juliana_lopes_rangel_fietto" , 3] ,
["ricardo_dos_santos_ferreira" , "marcos_henrique_fonseca_ribeiro" , 3] ,
["ricardo_dos_santos_ferreira" , "sabria_de_a_silveira" , 3] ,
["moacyr_amaral_domingues_figueiredo" , "joao_alberto_neves_dos_santos" , 3] ,
["carmen_lucia_campos_guizze" , "iara_tamella" , 3] ,
["carmen_lucia_campos_guizze" , "jose_cristiano_pereira" , 3] ,
["carmen_lucia_campos_guizze" , "livia_cavalcanti_figueiredo" , 3] ,
["denise_mara_soares_bazzolli" , "marcos_henrique_fonseca_ribeiro" , 3] ,
["edwin_benito_mitacc_meza" , "iara_tamella" , 3] ,
["elizabeth_pacheco_batista_fontes" , "juliana_lopes_rangel_fietto" , 3] ,
["elizabeth_pacheco_batista_fontes" , "luciano_gomes_fietto" , 3] ,
["iara_tamella" , "joao_alberto_neves_dos_santos" , 3] ,
["joao_alberto_de_oliveira" , "jose_geraldo_trani_brandao" , 3] ,
["joao_alberto_neves_dos_santos" , "jose_rodrigues_de_farias_filho" , 3] ,
["joao_alberto_neves_dos_santos" , "marcelle_de_sa_guimaraes" , 3] ,
["jose_elias_tomazini" , "jose_geraldo_trani_brandao" , 3] ,
["luciano_gomes_fietto" , "moyses_nascimento" , 3] ,
["anibal_alberto_vilcapoma_ignacio" , "alfredo_luiz_p_manhaes" , 6] ,
["tamotsu_hirata" , "carmen_lucia_campos_guizze" , 6] ,
["tamotsu_hirata" , "elaine_cristina_martinez_teodoro" , 6] ,
["tamotsu_hirata" , "joao_alberto_de_oliveira" , 6] ,
["tamotsu_hirata" , "marcelo_sampaio_martins" , 6] ,
["gilson_brito_alves_lima" , "romeu_silva_neto" , 6] ,
["luiz_heleno_moreira_duque" , "danielle_rodrigues_de_oliveira" , 6] ,
["luiz_heleno_moreira_duque" , "jose_geraldo_trani_brandao" , 6] ,
["fabio_ribeiro_cerqueira" , "hilario_cuquetto_mantovani" , 6] ,
["fabio_ribeiro_cerqueira" , "luciano_gomes_fietto" , 6] ,
["fabio_ribeiro_cerqueira" , "marcos_henrique_fonseca_ribeiro" , 6] ,
["fabio_ribeiro_cerqueira" , "moyses_nascimento" , 6] ,
["fabio_ribeiro_cerqueira" , "murilo_francisco_zerbini" , 6] ,
["moacyr_amaral_domingues_figueiredo" , "annibal_parracho_santanna" , 6] ,
["moacyr_amaral_domingues_figueiredo" , "iara_tamella" , 6] ,
["moacyr_amaral_domingues_figueiredo" , "renato_portugal" , 6] ,
["moacyr_amaral_domingues_figueiredo" , "romeu_silva_neto" , 6] ,
["carmen_lucia_campos_guizze" , "elaine_cristina_martinez_teodoro" , 6] ,
["carmen_lucia_campos_guizze" , "jayme_pereira_de_gouvea" , 6] ,
["carmen_lucia_campos_guizze" , "joao_alberto_neves_dos_santos" , 6] ,
["carmen_lucia_campos_guizze" , "jose_elias_tomazini" , 6] ,
["carmen_lucia_campos_guizze" , "marcelo_sampaio_martins" , 6] ,
["ana_carolina_scanavachi_moreira_campos" , "marina_dantas_de_oliveira_duarte" , 6] ,
["ana_carolina_scanavachi_moreira_campos" , "renata_maciel_de_melo" , 6] ,
["annibal_parracho_santanna" , "jose_rodrigues_de_farias_filho" , 6] ,
["annibal_parracho_santanna" , "nelio_pizzolato" , 6] ,
["danielle_rodrigues_de_oliveira" , "jayme_pereira_de_gouvea" , 6] ,
["denise_mara_soares_bazzolli" , "hilario_cuquetto_mantovani" , 6] ,
["elaine_cristina_martinez_teodoro" , "jayme_pereira_de_gouvea" , 6] ,
["elaine_cristina_martinez_teodoro" , "jose_elias_tomazini" , 6] ,
["elaine_cristina_martinez_teodoro" , "marcelo_sampaio_martins" , 6] ,
["elizabeth_pacheco_batista_fontes" , "murilo_francisco_zerbini" , 6] ,
["jayme_pereira_de_gouvea" , "marcelo_sampaio_martins" , 6] ,
["joao_alberto_de_oliveira" , "jose_elias_tomazini" , 6] ,
["jose_cristiano_pereira" , "nelio_pizzolato" , 6] ,
["jose_cristiano_pereira" , "renato_portugal" , 6] ,
["jose_elias_tomazini" , "marcelo_sampaio_martins" , 6] ,
["jose_rodrigues_de_farias_filho" , "nelio_pizzolato" , 6] ,
["juliana_lopes_rangel_fietto" , "luciano_gomes_fietto" , 6] ,
["juliana_lopes_rangel_fietto" , "moyses_nascimento" , 6] ,
["marina_dantas_de_oliveira_duarte" , "renata_maciel_de_melo" , 6] ,
["murilo_francisco_zerbini" , "sabria_de_a_silveira" , 6] ,
["gilson_brito_alves_lima" , "moacyr_amaral_domingues_figueiredo" , 9] ,
["luiz_heleno_moreira_duque" , "joao_alberto_de_oliveira" , 9] ,
["fabio_ribeiro_cerqueira" , "ricardo_dos_santos_ferreira" , 9] ,
["fabio_ribeiro_cerqueira" , "denise_mara_soares_bazzolli" , 9] ,
["moacyr_amaral_domingues_figueiredo" , "jose_rodrigues_de_farias_filho" , 9] ,
["carmen_lucia_campos_guizze" , "luiz_heleno_duque" , 9] ,
["carmen_lucia_campos_guizze" , "paulo_sergio_soares_da_silva" , 9] ,
["elizabeth_pacheco_batista_fontes" , "sabria_de_a_silveira" , 9] ,
["jayme_pereira_de_gouvea" , "jose_elias_tomazini" , 9] ,
["luiz_heleno_duque" , "paulo_sergio_soares_da_silva" , 9] ,
["anibal_alberto_vilcapoma_ignacio" , "pablo_leite_bernardo" , 10] ,
["fabio_ribeiro_cerqueira" , "pablo_leite_bernardo" , 10] ,
["ercilia_de_stefano" , "pablo_leite_bernardo" , 10] ,
["tamotsu_hirata" , "jayme_pereira_de_gouvea" , 12] ,
["fabio_ribeiro_cerqueira" , "elizabeth_pacheco_batista_fontes" , 12] ,
["fabio_ribeiro_cerqueira" , "juliana_lopes_rangel_fietto" , 12] ,
["fabio_ribeiro_cerqueira" , "sabria_de_a_silveira" , 12] ,
["moacyr_amaral_domingues_figueiredo" , "nelio_pizzolato" , 12] ,
["moacyr_amaral_domingues_figueiredo" , "jose_cristiano_pereira" , 15] ,
["tamotsu_hirata" , "jose_elias_tomazini" , 18] ,
["luiz_heleno_moreira_duque" , "jose_elias_tomazini" , 18] ,
["volker_franco_steier" , "ercilia_de_stefano" , 20] ,
["tamotsu_hirata" , "luiz_heleno_moreira_duque" , 21] ,
["luiz_heleno_moreira_duque" , "jayme_pereira_de_gouvea" , 21] ,
["luiz_heleno_moreira_duque" , "moacyr_amaral_domingues_figueiredo" , 30] ,
["luiz_heleno_moreira_duque" , "ana_carolina_scanavachi_moreira_campos" , 30] ,
["fabio_ribeiro_cerqueira" , "volker_franco_steier" , 30] ,
["fabio_ribeiro_cerqueira" , "carmen_lucia_campos_guizze" , 30] ,
["anibal_alberto_vilcapoma_ignacio" , "elton_fernandes" , 31] ,
["anibal_alberto_vilcapoma_ignacio" , "edwin_benito_mitacc_meza" , 31] ,
["anibal_alberto_vilcapoma_ignacio" , "joao_alberto_neves_dos_santos" , 34] ,
["luiz_heleno_moreira_duque" , "volker_franco_steier" , 40] ,
["fabio_ribeiro_cerqueira" , "ercilia_de_stefano" , 40] ,
["ercilia_de_stefano" , "livia_cavalcanti_figueiredo" , 50] ,
["moacyr_amaral_domingues_figueiredo" , "livia_cavalcanti_figueiredo" , 50] ,
["anibal_alberto_vilcapoma_ignacio" , "luiz_heleno_moreira_duque" , 60] ,
["anibal_alberto_vilcapoma_ignacio" , "fabio_ribeiro_cerqueira" , 60] ,
["luiz_heleno_moreira_duque" , "ercilia_de_stefano" , 60] ,
["luiz_heleno_moreira_duque" , "carmen_lucia_campos_guizze" , 63] ,
["volker_franco_steier" , "carmen_lucia_campos_guizze" , 80] ,
["ercilia_de_stefano" , "carmen_lucia_campos_guizze" , 100] ,
["volker_franco_steier" , "ana_carolina_scanavachi_moreira_campos" , 100] ,
["anibal_alberto_vilcapoma_ignacio" , "carmen_lucia_campos_guizze" , 106] ,
["ercilia_de_stefano" , "ana_carolina_scanavachi_moreira_campos" , 120] ,
["luiz_alberto_batista" , "andreia_patricia_gomes" , 125] ,
["luiz_alberto_batista" , "willian_cordeiro_farago" , 125] ,
["alcione_de_paiva_oliveira" , "willian_cordeiro_farago" , 125] ,
["andreia_patricia_gomes" , "rodrigo_siqueira_batista" , 125] ,
["andreia_patricia_gomes" , "willian_cordeiro_farago" , 125] ,
["fabio_ribeiro_cerqueira" , "willian_cordeiro_farago" , 125] ,
["rodrigo_siqueira_batista" , "willian_cordeiro_farago" , 125] ,
["luiz_alberto_batista" , "rodrigo_siqueira_batista" , 128] ,
["alcione_de_paiva_oliveira" , "andreia_patricia_gomes" , 128] ,
["moacyr_amaral_domingues_figueiredo" , "ana_carolina_scanavachi_moreira_campos" , 130] ,
["volker_franco_steier" , "moacyr_amaral_domingues_figueiredo" , 130] ,
["alcione_de_paiva_oliveira" , "rodrigo_siqueira_batista" , 134] ,
["fabio_ribeiro_cerqueira" , "rodrigo_siqueira_batista" , 140] ,
["ercilia_de_stefano" , "marcelle_de_sa_guimaraes" , 150] ,
["anibal_alberto_vilcapoma_ignacio" , "ana_carolina_scanavachi_moreira_campos" , 160] ,
["anibal_alberto_vilcapoma_ignacio" , "volker_franco_steier" , 170] ,
["luiz_alberto_batista" , "alcione_de_paiva_oliveira" , 178] ,
["carmen_lucia_campos_guizze" , "ana_carolina_scanavachi_moreira_campos" , 190] ,
["luis_ghivelder" , "garcia_s" , 200] ,
["pablo_leite_bernardo" , "garcia_s" , 200] ,
["luiz_alberto_batista" , "fabio_ribeiro_cerqueira" , 228] ,
["andreia_patricia_gomes" , "fabio_ribeiro_cerqueira" , 228] ,
["moacyr_amaral_domingues_figueiredo" , "marcelle_de_sa_guimaraes" , 250] ,
["anibal_alberto_vilcapoma_ignacio" , "marcelle_de_sa_guimaraes" , 253] ,
["moacyr_amaral_domingues_figueiredo" , "carmen_lucia_campos_guizze" , 283] ,
["luis_ghivelder" , "pablo_leite_bernardo" , 375] ,
["anibal_alberto_vilcapoma_ignacio" , "ercilia_de_stefano" , 400] ,
["alcione_de_paiva_oliveira" , "fabio_ribeiro_cerqueira" , 418] ,
["anibal_alberto_vilcapoma_ignacio" , "moacyr_amaral_domingues_figueiredo" , 650] ,
["ercilia_de_stefano" , "moacyr_amaral_domingues_figueiredo" , 825] ,
        ],
    },
})
