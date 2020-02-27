var story;
var back;
var sus;

GameStates.introSate = function (game, shared) {

    return{

        preload:function () {

            game.load.image('Background', 'assets/background.png'); //https://www.tumblr.com/tagged/eleanor-abernathy
            game.load.audio('Suspense', 'assets/suspense_music.wav'); //https://freesound.org/people/Toivo161/sounds/266009/
        },

        create:function () {

            back = game.add.sprite(0, 0, 'Background');
            story = game.add.text(10, game.world.centerY - 130, "A crazy lady who had a huge \nobsession for cats stole all the cats \nin the world." +
                " One day she found out \nthat there was one free cat in the \nworld and this infuriated her so she \nset out on a quest to hunt the last" +
                " \nremaining cat which is YOU!!!!!!!", {
                font: "bold 20px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            story.alpha = 0;

            game.time.events.add(Phaser.Timer.SECOND * 4, this.fadeBackground, this);
            game.time.events.add(Phaser.Timer.SECOND * 4, this.fadeText, this)
            game.time.events.add(Phaser.Timer.SECOND * 17, this.startGame, this);

            sus = game.add.audio('Suspense');
            sus.play();
        },

        fadeBackground:function() {

            game.add.tween(back).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        },

        fadeText:function () {

            game.add.tween(story).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        },

        startGame:function () {

            sus.stop();
            game.state.start('Game');
        }
    }
}