var Game = function(game) {};

Game.prototype = {

    preload: function() {
        this.optionCount = 1;
    },

    addMenuOption: function(text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function(target) {
            target.fill = "#0d1b2b";
            target.stroke = "rgba(90, 114, 255, 0.6)";
            txt.useHandCursor = true;
        };
        var onOut = function(target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;


    },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menuniv');

        this.addMenuOption('Niveau 1', function() {
            game.state.start("level1");
            console.log('level1 Start!');
        });
        this.addMenuOption('Niveau 2 hard', function() {
            game.state.start("level2");
            console.log('level2 Start!');

        });
        this.addMenuOption('Niveau 3 very hard', function() {
            game.state.start("level3");
            console.log('level3 Start!');

        });

        this.addMenuOption('retour Menu', function(e) {
            this.game.state.start("GameMenu");
        });
    }
};