var level2State = {


    create: function() {

        // BACKGROUND
        sky = game.add.sprite(0, 0, 'sky');



        // HEART  vie
        hearts = game.add.group();

        for (let b = 0; b < live; b++) {
            heart = hearts.create(600 + b * 35, 10, 'heart');
            heart.fixedToCamera = true;
        }


        // DOOR
        doors = game.add.group();
        door = doors.create(0, 470, 'door');
        door2 = doors.create(430, 15, 'door');
        door.enableBody = true;
        door2.enableBody = true;
        door2.animations.add('Open', [0, 1, 2, 3], 20, true);
        door.animations.add('Open', [0, 1, 2, 3], 20, true);


        // MONSTRES 1
        monstres = game.add.group();
        monstres.enableBody = true;
        monstre = monstres.create(511, 410, 'monstres');
        monstre.enableBody = true;
        tween = game.add.tween(monstre);
        tween = tween.to({ x: [7, 8, 9, 10, 11] }, 0, "Linear").loop(true);
        tween.start();
        Mleft = monstre.animations.add('Mleft', [7, 8, 9, 10, 11], 20, true);
        // MONSTRES 2 qui bouge
        monstre2 = monstres.create(350, 480, 'monstres');
        monstre2.enableBody = true;
        tween2 = game.add.tween(monstre2);
        tween2 = tween2.to({ x: [511, 511] }, 0, "Linear").loop(true);
        tween2.start();
        monstre2.animations.add('Mleft', [1, 2, 3, 4, 5], 10, true);
        // monstre 3
        monstre = monstres.create(431, 410, 'monstres');
        monstre.enableBody = true;
        // PLATEFORMS
        platforms = game.add.group();
        platforms.enableBody = true; //
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ground = platforms.create(110, game.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ground = platforms.create(550, game.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ground = platforms.create(600, game.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ground = platforms.create(200, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(4, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        var ledge = platforms.create(30, 720, 'ground');
        ledge.body.immovable = true;
        //  Now let's create two ledges
        var ledge = platforms.create(300, 420, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(0, 420, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(130, 320, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(200, 320, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(700, 450, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(50, 220, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(470, 100, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(370, 100, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(150, 100, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(300, 0, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(700, 220, 'ground');
        ledge.body.immovable = true;
        var ledge = platforms.create(700, 220, 'ground');
        ledge.body.immovable = true;

        var ledge = platforms.create(540, 330, 'ground');
        ledge.body.immovable = true;
        // pnj

        var ledge = platforms.create(400, 55, 'dude');
        ledge.body.immovable = true;
        // JOUEUR
        player = game.add.sprite(32, game.world.height - 160, 'sonic'); // AJOUTE LE PERSO
        game.physics.arcade.enable(player); // CREATION DE LA COLISION
        player.body.bounce.y = 0.2; // REBONT
        player.body.gravity.y = 300; // GRAVITE
        player.body.collideWorldBounds = true; // CREER LE REBONT DURANT LA COLISION


        player.animations.add('left', [17, 18, 17, 18], 10, true); // ANIMATION PERSO DROITE
        player.animations.add('right', [0, 4, 5, 6], 15, true); // ANIMATION PERSO GAUCHE

        // ETOILES

        stars = game.add.group();
        stars.enableBody = true;

        //  CREATION DE 12 ETOILES
        for (let i = 0; i < 25; i++) {
            let star = stars.create(50 + i * 90, 0, 'rings'); // PLACEMENT DES ETOILES
            //  GRAVITE DES ETOILES
            star.body.gravity.y = 300;
            //  PLACEMENT DES ETOILES ALEATOIREMENT
            star.body.bounce.y = 0.1 + Math.random() * 0.2;
        }

        // SCORE
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#ffffff' });
        scoreText.fixedToCamera = true;

        // Cle 
        keyText = game.add.text(20, 40, 'Key: 0', { fontSize: '20px', fill: '#ffffff' });

        // cursors
        cursors = game.input.keyboard.createCursorKeys(); // GESTION DU CLAnkeyR

        // KEYS
        keys = game.add.group();
        keys.enableBody = true;
        key1 = keys.create(250, 400, 'key');

        if (kscore >= 1) {
            key1.visible = false;
        }

    },

    update: function() {
        let hitPlatform = game.physics.arcade.collide(player, platforms); // COLISION PLATEFORME ET JOUEUR
        game.physics.arcade.collide(stars, platforms); // COLISION ETOILE ET PLATEFORME
        game.physics.arcade.collide(player, monstre); // COLISION JOUEUR ET MONSTRE
        game.physics.arcade.collide(player, monstre2); // COLISION JOUEUR ET MONSTRE 2
        game.physics.arcade.collide(player, keys, collectKey, null, this); // COLISION JOUEUR ET CLEF
        game.physics.arcade.overlap(player, stars, collectStar, null, this); // COLISION JOUEUR ET ETOILE

        if (player.body.y > 500 || checkCollide(player, monstre)) {
            if (live == 1) {
                game.state.start('GameOver');
            } else {
                live--;
                game.state.start('level1');
            }
        }
        if (player.body.y > 500 || checkCollide(player, monstre2)) {
            if (live == 1) {
                game.state.start('GameOver');
            } else {
                live--;
                game.state.start('level1');
            }
        }
        monstre.animations.play('Mleft');
        door.frame = 3;

        // verifie la colission monstre 1
        function checkCollide(player, monstre) {
            var boundsA = player.getBounds();
            var boundsB = monstre.getBounds();
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }
        // verifie la colission monstre 2

        function checkCollide(player, monstre2) {
            var boundsA = player.getBounds();
            var boundsB = monstre2.getBounds();
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }

        player.body.velocity.x = 0;
        if (cursors.left.isDown) // QUAND LA FLECHE BAS EST APPUYEE
        {
            player.body.velocity.x = -150;
            player.animations.play('left');
            game.camera.x -= 4;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
            game.camera.x += 2;

        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;

        }

        // COLLECT DES ETOILES
        function collectStar(player, star, key1) {
            star.kill(); // EFFACE LES ETOILES DU JEU
            score += 10;
            scoreText.text = 'Score : ' + score;
            console.log('score ajouter');
        }

        // COLLECT CLEF
        function collectKey(player, key1) {
            key1.kill();
            kscore += 1;
            keyText.text = 'clef : ' + kscore;
            console.log('clef ajouter');
        }



        if (kscore <= 1 && checkCollideDoor(player, door2)) {
            door2.animations.play('Open');

            game.state.start('Game');

        }

        function checkCollideDoor(player, door2) {
            var bounds1 = player.getBounds();
            var bounds2 = door2.getBounds();
            return Phaser.Rectangle.intersects(bounds1, bounds2);
            game.state.start('Game');
        }
    }

}