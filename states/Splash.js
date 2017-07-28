var Splash = function() {};

Splash.prototype = {

    loadScripts: function() {
        game.load.script('style', 'lib/style.js');

        game.load.script('level1', 'states/level1.js');
        game.load.script('level2', 'states/level2.js');
        game.load.script('level3', 'states/level3.js');

        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('gamemenu', 'states/GameMenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('gameover', 'states/GameOver.js');
        game.load.script('credits', 'states/Credits.js');
        game.load.script('options', 'states/Options.js');
    },

    loadBgm: function() {
        // thanks Kevin Macleod at http://incompetech.com/
        game.load.audio('dangerous', 'assets/music/Dangerous.mp3');
        game.load.audio('exit', 'assets/music/Exit the Premises.mp3');
    },
    // varios freebies found from google image search
    loadImages: function() {
        game.load.image('menu-bg', 'assets/menu/land.png');
        game.load.image('options-bg', 'assets/menu/options-bg.jpg');
        game.load.image('gameover-bg', 'assets/menu/gameover-bg.jpg');
        game.load.image('menuniv', 'assets/menu/foret.jpg');


        game.load.image('sky', 'assets/background/sunorbit.png');
        game.load.image('sky2', 'assets/background/starfield.png');
        game.load.image('sky3', 'assets/background/background.png');

        game.load.image('ground', 'assets/background/ground.png');
        game.load.image('ground2', 'assets/background/platform.png');
        game.load.image('ground3', 'assets/background/plate.png');
        game.load.image('ground4', 'assets/background/ice-platform.png');


        game.load.spritesheet('door', 'assets/entite/porte.png', 63, 85);
        game.load.image('key', 'assets/entite/key1.png', 32, 32);
        game.load.image('heart', 'assets/entite/heart1.png');
        game.load.image('star', 'assets/entite/star.png');
        game.load.spritesheet('rings', 'assets/entite/rings2.png', 21, 20);

        game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
        game.load.spritesheet('sonic', 'assets/sprites/sonic.png', 48, 48);

        game.load.spritesheet('monstres', 'assets/ennemi/monstre.png', 82, 52);
    },

    loadFonts: function() {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function() {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 200);
        this.status = game.make.text(game.world.centerX, 380, 'Démarrage...', { fill: 'white' });
        utils.centerGameObjects([this.logo, this.status]);
    },

    preload: function() {
        game.add.sprite(-200, -50, 'demarrage');
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();

    },

    addGameStates: function() {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("GameOver", GameOver);
        game.state.add("Credits", Credits);
        game.state.add("Options", Options);
        game.state.add('level1', playState);
        game.state.add('level2', level2State);
        game.state.add('level3', level3State);
        let niveau;
        let score = 0;
        let scoreText;
        let stars;
        let keys;
        let key1;
        let kscore = 0;
        let gameoverText;
        let gameoverP;
        let live = 3;
    },

    addGameMusic: function() {
        music = game.add.audio('dangerous');
        music.loop = true;
        music.play();
    },

    create: function() {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();

        setTimeout(function() {
            game.state.start("GameMenu");
        }, 1000);
    }
};