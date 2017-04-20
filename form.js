console.clear(); // <-- keep the console clean on refresh
var dataString = ["PPC", "SEO", "Social", "Contenu et optimisation"];
var data = [24, 105, 24, 52];
var currentModel = {};
var updateGraphJS;
/* global angular */
(function() {
  'use strict';

  var app = angular.module('formlyExample', ['formly', 'formlyBootstrap', 'rzModule'], function config(formlyConfigProvider) {
    // set templates here
    formlyConfigProvider.setType({
      name: 'custom',
      templateUrl: 'custom.html'
    });
      
    formlyConfigProvider.setType({
      name: 'slider',
      template: ['<rzslider rz-slider-model="model[options.key]"' +
                 ' rz-slider-options="to.sliderOptions"></rzslider>'].join(' '),
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });

    //range slider type
    formlyConfigProvider.setType({
      name: 'range-slider',
      template: ['<rzslider rz-slider-model="model[options.key].low"' +
                 'rz-slider-high="model[options.key].high" ' +
                 'rz-slider-options="to.sliderOptions"></rzslider>'].join(' '),
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });
  });
  

  app.controller('MainCtrl', function MainCtrl(formlyVersion) {
    var vm = this;
    // funcation assignment
    vm.onSubmit = onSubmit;
    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Quantik Digital Propeller',
      url: 'http://www.quantik.ca' // a link to your twitter/github/blog/whatever
    };
    vm.exampleTitle = 'Quantik';
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };
    vm.model = {
        avgsale: 1
    };
    vm.model.profile = {
        
    };
    vm.options = {
      formState: {
        awesomeIsForced: false
      }
    };
    vm.updateGraph = function (){
        if (!vm.model.profile.enttype){
            return;
        }else if (vm.model.profile.enttype == "b2b" && !vm.model.profile.b2bfield){
            console.log("b2b and no b2b choice");
            return;
        }else if (vm.model.profile.enttype == "b2c" && !vm.model.profile.b2cfield){
            console.log("b2c and no b2c choice");
            return;
        }
        vm.model.total = vm.getTotalMarketing(vm.model.profile.enttype, vm.model.avgsale)
        vm.model.split = vm.getSplit(vm.model.profile);
        currentModel = vm.model;
        updateGraphFrontEnd();
    }
    
    vm.getSplit = function (profile){
        var type = profile.enttype;
        var subdomain = "";
        //"PPC", "SEO", "Social", "Contenu et optimisation"
        var split = [0,0,0,0];
        if (type == "b2b"){
            console.log("profile.b2bfield is " + profile.b2bfield);
            subdomain = profile.b2bfield;
            switch (subdomain){
                case "transport_entreposage" :
                    split = [10,20,30,40];
                    break;
                case "service_profess" :
                    split = [15,30,30,25];
                    break;
                case "immob" :
                    split = [15,30,30,25];
                    break;
                case "alimen" :
                    split = [1,1,1,97];
                    break;
                case "scientifique" :
                    split = [30,30,30,30];
                    break;
                case "alimen" :
                    split = [5,5,50,40];
                    break;
                case "construction" :
                    split = [80,10,5,5];
                    break;
                case "techno_infor" :
                    split = [5,60,10,25];
                    break;
                case "telecom" :
                    split = [90,2,2,6];
                    break;
                case "voyage" :
                    split = [15,30,30,25];
                    break;
                default:
                    console.log("Wrong case in switch (subdomain b2b)");
                    split = [0,0,0,100];
                    break;
            }
            return split;
        }else if (type == "b2c") {
            subdomain = profile.b2cfield;
            switch (subdomain){     
                case "commerce_detail":
                    split = [5,5,50,40];
                    break;
                case "rest_heber":
                    split = [5,5,50,40];
                    break;
                case "finan_assur":
                    split = [5,5,50,40];
                    break;
                case "sante_medic":
                    split = [5,5,50,40];
                    break;
                case "transp_entrepo":
                    split = [5,5,50,40];
                    break;
                case "immob":
                    split = [5,5,50,40];
                    break;
                case "alim":
                    split = [5,5,50,40];
                    break;
                case "construct":
                    split = [5,5,50,40];
                    break;
                case "luxe":
                    split = [5,5,50,40];
                    break;
                case "voyage":
                    split = [5,5,50,40];
                    break;
                case "mode":
                    split = [5,5,50,40];
                    break;
                case "tech_infor":
                    split = [5,5,50,40];
                    break;
                case "telecom":
                    split = [5,5,50,40];
                    break;
                case "camping_ple":
                    split = [5,5,50,40];
                    break;
                default:
                    console.log("Wrong case in switch (subdomain b2c)");
                    split = [0,0,0,100];
                    break;
            }
            return split;
        }else {console.log("Wrong type in getSplit");}
        
    }
    
    vm.getTotalMarketing = function (type,avgsale){
        if (type == "b2c"){
            if (avgsale < 1){
                return 2000;
            }else if (avgsale > 9) {
                return 0;
            }else{
                return avgsale * 3500;
            }
        }else if (type == "b2b"){
            if (avgsale < 1){
                return 1000;
            }else if (avgsale > 9) {
                return 0;
            }else{
                return avgsale * 1750;
            }
        }else{console.log("wrong type")};
    }
      
    vm.fields = [   
      {
        key: "profile.enttype",
        type: "select",
        templateOptions: {
          label: "Quel est le type de votre entreprise?",
          onChange: vm.updateGraph,
          options: [
            {
              name: "B2B",
              value: "b2b"
            },
            {
              name: "B2C",
              value: "b2c"
            }
          ]
        }
      },
      {          
        key: "profile.b2bfield",
        type: "select",
        templateOptions: {
          label: "Dans quel secteur est votre entreprise?",
          onChange: vm.updateGraph,
          options: [
            {
              name: "Manifacture et usinage",
              value: "manifacture_usinage"
            },
            {
              name: "Transport et entreposage",
              value: "transport_entreposage"
            },
            {
              name: "Services professionnels",
              value: "service_profess"
            },
            {
              name: "Immobilier",
              value: "immob"
            },
            {
              name: "Alimentation",
              value: "alimen"
            },
            {
              name: "Scientifique",
              value: "scientifique"
            },
            {
              name: "Agriculture",
              value: "alimen"
            },
            {
              name: "Construction",
              value: "construction"
            },
            {
              name: "Technologies et informatique",
              value: "techno_infor"
            },
            {
              name: "Télécommunication",
              value: "telecom"
            },
            {
              name: "Voyage",
              value: "voyage"
            }
          ]
        },
        hideExpression: "model.profile.enttype != 'b2b'",
          
        /*expressionProperties: {
          'templateOptions.disabled': '!model.enttype',
          'templateOptions.'
        }*/
      },
      {
        "key": "profile.b2cfield",
        "type": "select",
        "templateOptions": {
          "label": "Dans quel secteur est votre entreprise?",
          onChange: vm.updateGraph,
          "options": [
            {
              name: "Commerce de détail",
              value: "commerce_detail"
            },
            {
              name: "Restauration et hébergement",
              value: "rest_heber"
            },
            {
              name: "Finance et Assurances",
              value: "finan_assur"
            },
            {
              name: "Santé et Médical",
              value: "sante_medic"
            },
            {
              name: "Transport et entreposage",
              value: "transp_entrepo"
            },
            {
              name: "Immobilier",
              value: "immob"
            },
            {
              name: "Alimentation",
              value: "alim"
            },
            {
              name: "Construction",
              value: "construct"
            },
            {
              name: "Luxe",
              value: "luxe"
            },
            {
              name: "Voyage",
              value: "voyage"
            },
            {
              name: "Mode",
              value: "mode"
            },
            {
              name: "Technologies et informatique",
              value: "tech_infor"
            },
            {
              name: "Télécommunication",
              value: "telecom"
            },
            {
              name: "Camping et plein air",
              value: "camping_ple"
            }
          ]
        },
        hideExpression: "model.profile.enttype != 'b2c'",
      },
        {
        key: 'avgsale',
        type: 'slider',
        templateOptions: {
          label: 'Quels sont vos ventes moyennes annuelles?',
          sliderOptions: {
            floor: 0,
            ceil: 10,
            showTicks: 10,
            onChange: vm.updateGraph,
            translate: function(value, sliderId, label) {
                  switch (label) {
                    case 'floor':
                      return '<b><1M</b> $';
                    case 'ceil':
                      return '<b>>10M</b> $';
                    default:
                          if (value == 0){
                              return '<b><1M</b> $';
                          }
                          else if (value == 10){
                              return '<b>>10M</b> $';
                          }
                          else{
                              return value + ' M$'   
                          }
                  }
                }
          }
        }
      },
      {
        key: "profile.market",
        type: "select",
        templateOptions: {
          label: "Quel est votre marché ciblé ?",
          onChange: vm.updateGraph,
          options: [
            {
              name: "Local",
              value: "local"
            },
            {
              name: "Canada",
              value: "canada"
            },
            {
              name: "États-Unis",
              value: "usa"
            },
            {
              name: "International",
              value: "int"
            },
          ]
        }
      },
    ];
    function onChange(){
        console.log("change");
    }
    // function definition
    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }
  });
})();

function updateGraphFrontEnd() {
    console.log("Sales are " + currentModel.avgsale + "M$.");
    console.log("Total Marketing investment is " + currentModel.total + "$/mois.");
    console.log("Split is " + currentModel.split + ".");
    data = currentModel.split;
    updateGraphJS();
}

window.onload = function () {      
    var r = Raphael("holder");

    r.customAttributes.segment = function (x, y, r, a1, a2) {
        var flag = (a2 - a1) > 180,
            clr = (a2 - a1) / 360;
        a1 = (a1 % 360) * Math.PI / 180;
        a2 = (a2 % 360) * Math.PI / 180;
        return {
            path: [["M", x, y], ["l", r * Math.cos(a1), r * Math.sin(a1)], ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)], ["z"]],
            fill: "hsb(" + clr + ", .75, .8)"
        };
    };

    function animate(ms) {
        var start = 0,
            val;
        for (i = 0; i < ii; i++) {
            val = 360 / total * data[i];
            paths[i].animate({segment: [200, 200, 150, start, start += val]}, ms || 1500, "bounce");
            paths[i].angle = start - val / 2;
        }
    }
    var catText = r.text(200, 20, "").attr({font: '100 20px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif', fill: "#ccc"});
    var welcomeText = r.text(200, 20, "Cliquez sur un segment pour voir sa description.").attr({font: '100 20px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif', fill: "#000"});
    
    updateGraphJS = function() {
                welcomeText.remove();
                catText.remove();
                catText = r.text(200, 20, "Cliquez sur un segment pour voir sa description.").attr({font: '100 20px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif', fill: "#000"});
                total = 0;
                for (var i = 0 ; i < data.length ; i++){
                    total = total + data[i];
                }
                animate();
    }
    
    var paths = r.set(),
        total,
        start,
        bg = r.circle(200, 200, 0).attr({stroke: "#ccc", "stroke-width": 4});
    data = data.sort(function (a, b) { return b - a;});

    total = 0;
    for (var i = 0, ii = data.length; i < ii; i++) {
        total += data[i];
    }
    start = 0;
    for (i = 0; i < ii; i++) {
        var val = 360 / total * data[i];
        (function (i, val) {
            paths.push(r.path().attr({segment: [200, 200, 1, start, start + val], stroke: "#ccc"}).click(function () {
                welcomeText.remove();
                catText.remove();
                catText = r.text(200, 20, dataString[i]).attr({font: '100 20px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif', fill: "#000"});
                //total += data[i];
                //data[i] *= 2;
                animate();
            }));
        })(i, val);
        start += val;
    }
    bg.animate({r: 151}, 1000, "bounce");
    animate(1000);
};