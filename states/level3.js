var level3State = {


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



        // MONSTRES 1
        monstres = game.add.group();
        monstres.enableBody = true;
        monstre = monstres.create(511, 410, 'monstres');
        monstre.enableBody = true;
        tween = game.add.tween(monstre);
        tween = tween.to({ x: [511, 511] }, 0, "Linear").loop(true);
        tween.start();
        monstre.animations.add('Mleft', [7, 8, 9, 10, 11], 20, true);

        // PLATEFORMS
        platforms = game.add.group();
        platforms.enableBody = true; //
        var ground = platforms.create(0, game.world.height - 20 + 20, 'ground4');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        //bas
        for (a = 0; a < 4; a++) {
            let platform = platforms.create(500 + a * 60, 480, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        for (a = 0; a < 3; a++) {
            let platform = platforms.create(0 + a * 70, 480, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        // niv 1
        for (a = 0; a < 4; a++) {
            let platform = platforms.create(200 + a * 80, 350, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        // niv 2
        for (a = 0; a < 2; a++) {
            let platform = platforms.create(0 + a * 680, 230, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        for (a = 0; a < 4; a++) {
            let platform = platforms.create(200 + a * 80, 150, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        // haut
        for (a = 0; a < 4; a++) {
            let platform = platforms.create(500 + a * 60, 0, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        for (a = 0; a < 3; a++) {
            let platform = platforms.create(0 + a * 70, 0, 'ground4');
            platform.body.immovable = true;
            platform.scale.setTo(1, 1);
        }
        // pnj

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


        // verifie la colission monstre 1
        function checkCollide(player, monstre) {
            var boundsA = player.getBounds();
            var boundsB = monstre.getBounds();
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }
        // verifie la colission monstre 2



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






    }

}