/**
    State shown when the player loses!
    Code by Rob Kleffner, 2011
*/

var fs = require("fs");

Mario.LoseState = function () {
    this.drawManager = null;
    this.camera = null;
    this.gameOver = null;
    this.font = null;
    this.wasKeyDown = false;
};

Mario.LoseState.prototype = new Enjine.GameState();

Mario.LoseState.prototype.Enter = function () {
    this.drawManager = new Enjine.DrawableManager();
    this.camera = new Enjine.Camera();

    this.gameOver = new Enjine.AnimatedSprite();
    this.gameOver.Image = Enjine.Resources.Images["gameOverGhost"];
    this.gameOver.SetColumnCount(9);
    this.gameOver.SetRowCount(1);
    this.gameOver.AddNewSequence("turnLoop", 0, 0, 0, 8);
    this.gameOver.PlaySequence("turnLoop", true);
    this.gameOver.FramesPerSecond = 1 / 15;
    this.gameOver.X = 112;
    this.gameOver.Y = 68;

    this.font = Mario.SpriteCuts.CreateBlackFont();
    this.font.Strings[0] = { String: "Game over !", X: 116, Y: 160 };

    this.drawManager.Add(this.font);
    this.drawManager.Add(this.gameOver);

    var score = Mario.MarioCharacter.LevelString;

    fs.readFile("highscore/mario.txt", "utf-8", (err, data) => {
        var h_world = parseInt(data.split("-")[0]);
        var h_level = parseInt(data.split("-")[1]);

        var p_world = parseInt(score.split("-")[0]);
        var p_level = parseInt(score.split("-")[1]);

        if (p_world > h_world) {
            fs.writeFile("highscore/mario.txt", score, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        } else if (p_world === h_world && p_level > h_level) {
            fs.writeFile("highscore/mario.txt", score, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    });

    setTimeout(function () {
        window.close();
    }, 3000);
};

Mario.LoseState.prototype.Exit = function () {
    this.drawManager.Clear();
    delete this.drawManager;
    delete this.camera;
    delete this.gameOver;
    delete this.font;
};

Mario.LoseState.prototype.Update = function (delta) {
    this.drawManager.Update(delta);
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) {
        this.wasKeyDown = true;
    }
};

Mario.LoseState.prototype.Draw = function (context) {
    this.drawManager.Draw(context, this.camera);
};

Mario.LoseState.prototype.CheckForChange = function (context) {
    if (this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) {
        context.ChangeState(new Mario.TitleState());
    }
};
