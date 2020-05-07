
GameStates.victoryState2 = function (game) {

    return {

        create: function () {

            victory_text = game.add.text(20, game.world.centerY - 140, "PLAYER2 CAN NOW POOP IN PEACE!", { font: "30px Arial", fill: "#ff0044", align: "left" });
            return_text = game.add.text(110, game.world.centerY, "PLAY AGAIN?", { font: "30px Arial", fill: "#ff0044", align: "left" });

            return_text.inputEnabled = true;

            return_text.events.onInputOver.add(this.over, this);
            return_text.events.onInputOut.add(this.out, this);

            return_text.events.onInputDown.add(this.playGame, this);

            flush_music = game.add.audio('Victory_Flush').play();
        },

        over: function (item) {

            item.fill = "#ffff44";
        },

        out: function (item) {

            item.fill = "#ff0044";

        },

        playGame: function () {

            game.state.start('SelectState');
        },
    }
}