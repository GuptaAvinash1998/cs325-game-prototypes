var GameStates = {};
var shared = {};
var Game = {};

window.onload = function () {

    //	Create your Phaser game and inject it into the 'game' div.
    //	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    var game = new Phaser.Game(696, 448);

    //	Add the States your game has.
    //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

    // An object for shared variables, so that them main menu can show
    // the high score if you want.

    game.state.add('MainMenu', GameStates.menuState(game, shared));
    game.state.add('FreePlay', GameStates.freePlayState(game, shared));
    game.state.add('Game', GameStates.mainState(game, shared));
    game.state.add('SelectState', GameStates.selectionState(game, shared));

    //	Now start the Boot state.
    game.state.start('MainMenu');

};