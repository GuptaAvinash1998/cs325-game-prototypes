/**var option_1;
var option_2;
var snow;

var bootState = {

    preload:function () {

        game.load.image('Snowball', 'assets/snowBall.png');
    },

    create:function () {

        snow = game.add.image(game.world.centerX, game.world.centerY, 'SnowBall');
    }

};

var game = new Phaser.Game( 350, 350, Phaser.AUTO, 'game' );
game.state.add('BootState', bootState);
game.state.add('Game', mainState);

//game.state.start('Game');**/
var GameStates = {};
var shared = {};

window.onload = function() {

    //	Create your Phaser game and inject it into the 'game' div.
    //	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    var game = new Phaser.Game(350, 350, Phaser.AUTO, 'game' );

    //	Add the States your game has.
    //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

    // An object for shared variables, so that them main menu can show
    // the high score if you want.

    game.state.add( 'MainMenu', GameStates.menuState( game, shared ) );
    game.state.add( 'Game', GameStates.mainState( game, shared ) );
    game.state.add('Rules', GameStates.ruleState(game, shared));
    game.state.add('Intro', GameStates.introSate(game, shared));
    game.state.add('Lose', GameStates.losingState(game, shared));

    //	Now start the Boot state.
    game.state.start('MainMenu');

};