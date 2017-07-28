var GameMenu = function() {};


GameMenu.prototype = {

    menuConfig: {
        startY: 160,
        startX: 40
    },

    init: function() {
        this.titleText = game.make.text(game.world.centerX, 40, "Retro World v2", {
            font: 'bold 60pt TheMinion',
            fill: '#D2543E',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },

    create: function() {

        if (music.name !== "dangerous" && playMusic) {
            music.stop();
            music = game.add.audio('dangerous');
            music.loop = true;
            music.play();
        }
        game.stage.disableVisibilityChange = true;
        game.add.sprite(-1, 0, 'menu-bg');
        game.add.existing(this.titleText);

        this.addMenuOption('Start', function() {
            game.state.start("Game");
        });
        this.addMenuOption('Options', function() {
            game.state.start("Options");
        });
        this.addMenuOption('Credits', function() {
            game.state.start("Credits");
        });
    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);