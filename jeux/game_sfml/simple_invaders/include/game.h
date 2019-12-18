#pragma once
#include "invaders.h"

/*
** Game handling
*/
class Game
{
private:

    void load();
    void wideTextWinLoose(const std::string &text, const sf::Color &color);
    void wideTextLives(const std::string &text, const sf::Color &color);
    void wideTextNumberOfAliens(const std::string &text, const sf::Color &color);

    sf::RenderWindow _window;
    sf::Font _font;
    sf::Text _full_text_winLoose;
    sf::Text _full_text_Lives;
    sf::Text _full_text_NumberOfAliens;

    // Flags for key pressed
    bool upFlag    = false;
    bool downFlag  = false;
    bool leftFlag  = false;
    bool rightFlag = false;
    bool spaceFlag = false;
    bool direction = false;

    //Bounds of Alien
    int left_alien;
    int right_alien;

     //Position of the ship
    int move_ship_x;
    int move_ship_y;

    //Position of the alien
    int move_alien_x;
    int move_alien_y;

    // Position of the Alien
    int pos1_X_alien = 300;
    int pos2_X_alien = 300;
    int pos3_X_alien = 300;

    // Position of the Fence
    int pos_X_fence = 250;
    int pos_Y_fence;

    // Position of the Heart
    int pos_Y_heart;

    // Position of the Speed
    int pos_Y_speed;

    //Choose a random alien
    int randomAlien;

    //Limit of the ship
    int limit_ship_1 = 400;
    int limit_ship_2 = 1400;

    //Check if the player fire
    bool isFiring = false;

    bool barrageBlastAlien = false;

    //Check if the playe WIN/LOOSE
    bool loose = false;
    bool win   = true;
    bool close = false;

    //Lives
    int lives = 2;

    //PATHS
    const std::string PATH_SHIP          = "../assets/img/ship.png";
    const std::string PATH_BLAST         = "../assets/img/blast.png";
    const std::string PATH_ALIEN         = "../assets/img/alien.png";
    const std::string PATH_BLAST_ALIEN   = "../assets/img/alien_blast.png";
    const std::string PATH_FENCE         = "../assets/img/fence.png";
    const std::string PATH_ITEM_HEALT    = "../assets/img/heart.png";
    const std::string PATH_ITEM_SPEED    = "../assets/img/speed.png";

    //Static Variables
    static constexpr int WINDOW_WIDTH  = 1800;
    static constexpr int WINDOW_HEIGHT = 1300;
    int SPEED_SPRITE = 7;
    static constexpr int SPEED_ALIEN = 3;

public:
    Game(void);
    ~Game();
    void loop();
};
