var losingMessage;
var playAgain;
var menu;

GameStates.losingState = function(game, shared){

    return{

        create:function () {

            losingMessage = game.add.text(10, game.world.centerY - 130, "YOU GOT HIT OR CAPTURED!! \nALL HOPE FOR SAVING THE \nLAST CAT IS DEAD!! \n\n" +
                "Wanna Try again?!", {
                font: "23px Arial",
                fill: "#ff0044",
                align: "left"
            })

            playAgain = losingMessage = game.add.text(10, game.world.centerY + 40, "YEAH!", {
                font: "30px Arial",
                fill: "#ff0044",
                align: "left"
            });

            menu = losingMessage = game.add.text(130, game.world.centerY + 40, "NAH!", {
                font: "30px Arial",
                fill: "#ff0044",
                align: "left"
            });

            playAgain.inputEnabled = true;

            playAgain.events.onInputOver.add(this.over, this);
            playAgain.events.onInputOut.add(this.out, this);

            playAgain.events.onInputDown.add(this.gameScreen, this);

            menu.inputEnabled = true;

            menu.events.onInputOver.add(this.over, this);
            menu.events.onInputOut.add(this.out, this);

            menu.events.onInputDown.add(this.menuScreen, this);
        },

        over:function(item) {

            item.fill = "#ffff44";
        },

        out:function(item) {

            item.fill = "#ff0044";

        },

        menuScreen:function (item) {

            game.state.start('MainMenu');
        },

        gameScreen:function (item) {

            game.state.start('Game');
        }
    }
}
