/*
 *
 * Name  : game.cpp
 * 
 * 
 * Desc  : Containt all the contents of the Simple Invaders
 * 
 */

#include "game.h"
#include "player.cpp"
#include "alien.cpp"
#include "blastPlayer.cpp"
#include "blastAlien.cpp"
#include "fence.cpp"
#include "items/health.cpp"
#include "items/speed.cpp"

Game::Game()
{
    _window.create(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "Simple invaders", sf::Style::Close | sf::Style::Titlebar);
    _window.setVerticalSyncEnabled(true);
    load();
}

Game::~Game()
{
}

void Game::load()
{
    _font.loadFromFile("assets/ttf/simple_invaders/Sansation.ttf");
    _full_text_winLoose.setFont(_font);
    _full_text_winLoose.setCharacterSize(50);

    _full_text_Lives.setFont(_font);
    _full_text_Lives.setCharacterSize(50);

    _full_text_NumberOfAliens.setFont(_font);
    _full_text_NumberOfAliens.setCharacterSize(50);

    // Set the position of the ship
    move_ship_x = _window.getSize().x / 2.;
    move_ship_y = _window.getSize().y / 1.24;
}

void Game::wideTextWinLoose(const std::string &text, const sf::Color &color)
{
    _full_text_winLoose.setString(text);
    sf::FloatRect box = _full_text_winLoose.getLocalBounds();
    _full_text_winLoose.setOrigin(box.left + box.width / 2.0f,
                                  box.top + box.height / 2.0f);
    _full_text_winLoose.setPosition(WINDOW_WIDTH / 2.0f, WINDOW_HEIGHT / 2.0f);
    _full_text_winLoose.setFillColor(color);
    _window.draw(_full_text_winLoose);
}

void Game::wideTextLives(const std::string &text, const sf::Color &color)
{
    _full_text_Lives.setString(text);
    sf::FloatRect box = _full_text_Lives.getLocalBounds();
    _full_text_Lives.setOrigin(box.left + box.width / 2.0f,
                               box.top + box.height / 2.0f);
    _full_text_Lives.setPosition(120, _window.getSize().y-40);
    _full_text_Lives.setFillColor(color);
    _window.draw(_full_text_Lives);
}

void Game::wideTextNumberOfAliens(const std::string &text, const sf::Color &color)
{
    _full_text_NumberOfAliens.setString(text);
    sf::FloatRect box = _full_text_NumberOfAliens.getLocalBounds();
    _full_text_NumberOfAliens.setOrigin(box.left + box.width / 2.0f,
                                        box.top + box.height / 2.0f);
    _full_text_NumberOfAliens.setPosition(1650, _window.getSize().y-40);
    _full_text_NumberOfAliens.setFillColor(color);
    _window.draw(_full_text_NumberOfAliens);
}

void Game::loop()
{

    /***************************************************                                           
    *                                                  *
    *                   INSTANCIATE                    *
    *                                                  *                                                 
    ***************************************************/

    //Instanciate player
    Player player(PATH_SHIP);

    // Instaniate the vectors
    std::vector<Player> playerVec(1, player);
    std::vector<BlastPlayer> blastVec;
    std::vector<BlastAlien> blastAlienVec;
    std::vector<Alien> alienVec(18);
    std::vector<Fence> fenceVec(5);
    std::vector<Health> healthVec(1);
    std::vector<Speed> speedVec(1);

    // Get the x max size of the window
    int size_Max = (int)_window.getSize().x;

    /***************************************************                                           
    *                                                  *
    *                SET THE POSITION                  *
    *                                                  *                                                 
    ***************************************************/

    // Set the position of the Alien
    for (int i = 0; i < alienVec.size(); i++)
    {
        if (i <= 5)
        {
            alienVec[i].setPos(sf::Vector2f(pos1_X_alien, 50));
            pos1_X_alien += 200;
        }
        else if (i >= 5 && i <= 11)
        {
            alienVec[i].setPos(sf::Vector2f(pos2_X_alien, 250));
            pos2_X_alien += 200;
        }
        else
        {
            alienVec[i].setPos(sf::Vector2f(pos3_X_alien, 450));
            pos3_X_alien += 200;
        }
    }

    // Set the position of the Fence
    for (int i = 0; i < fenceVec.size(); i++)
    {

        pos_Y_fence = _window.getSize().y / 1.5;

        fenceVec[i].setPos(sf::Vector2f(pos_X_fence, pos_Y_fence));
        pos_X_fence += 650;

        if (i == 3)
        {
            pos_Y_fence = _window.getSize().y / 1.34;

            fenceVec[i].setPos(sf::Vector2f(400, pos_Y_fence));
            fenceVec[i].rotate(90);
        }

        if (i == 4)
        {
            pos_Y_fence = _window.getSize().y / 1.34;

            fenceVec[i].setPos(sf::Vector2f(1400, pos_Y_fence));
            fenceVec[i].rotate(90);
        }
    }

    // Set the position of the Health
    for (int i = 0; i < healthVec.size(); i++)
    {
        pos_Y_heart = _window.getSize().y / 1.23;

        healthVec[i].setPos(sf::Vector2f(250, pos_Y_heart));
    }

    // Set the position of the Speed
    for (int i = 0; i < speedVec.size(); i++)
    {
        pos_Y_speed = _window.getSize().y / 1.23;

        speedVec[i].setPos(sf::Vector2f(1560, pos_Y_speed));
    }

    while (this->_window.isOpen())
    {

        sf::Event event;

        /***************************************************                                           
        *                                                  *
        *                     MOVEMENT                     *
        *                                                  *                                                 
        ***************************************************/

        // Update coordinates
        if (leftFlag)
            move_ship_x -= SPEED_SPRITE;

        if (rightFlag)
            move_ship_x += SPEED_SPRITE;

        // Check screen boundaries
        if (move_ship_x < limit_ship_1 && limit_ship_1 != 0)
        {
            move_ship_x = 400;
        }
        else if (move_ship_x < 0)
        {
            move_ship_x = 0;
        }

        if (move_ship_x > limit_ship_2 && limit_ship_2 != 1800)
        {
            move_ship_x = 1400;
        }
        else if (move_ship_x > 1800)
        {
            move_ship_x = 1800;
        }

        if (playerVec.size() != 0)
        {
            //Move the ship of the player
            playerVec[0].setPos(sf::Vector2f(move_ship_x, move_ship_y));
        }

        /***************************************************                                           
        *                                                  *
        *               GET EVENT ON KEYBOARD              *
        *                                                  *                                                 
        ***************************************************/

        // Detect evenement on the window
        while (this->_window.pollEvent(event))
        {
            switch (event.type)
            {
            case sf::Event::KeyPressed:

                switch (event.key.code)
                {
                // If escape is pressed, close the application
                case sf::Keyboard::Escape:
                    _window.close();
                    break;

                // If left is pressed, move left the ship
                case sf::Keyboard::Q:
                    leftFlag = true;
                    break;

                // If Right is pressed, move right the ship
                case sf::Keyboard::D:
                    rightFlag = true;
                    break;

                // If Space is pressed, the ship fire
                case sf::Keyboard::M:
                    spaceFlag = true;
                    isFiring = true;
                    break;
                default:
                    break;
                }

                break;
            case sf::Event::KeyReleased:

                switch (event.key.code)
                {

                // If Left is release, stop the ship
                case sf::Keyboard::Q:
                    leftFlag = false;
                    break;

                // If Right is release, stop the ship
                case sf::Keyboard::D:
                    rightFlag = false;
                    break;

                default:
                    break;
                }
                break;
            // When user close the window
            case sf::Event::Closed:
                this->_window.close();
                break;

            default:
                break;
            }
        }

        //Clear the window
        this->_window.clear(sf::Color::Black);

        /***************************************************                                           
        *                                                  *
        *              INSTANCIATE THE BLAST               *
        *                                                  *                                                 
        ***************************************************/

        // Detect if the user has to shoot
        if (isFiring == true)
        {
            if (blastVec.size() < 2 && alienVec.size() != 0 && playerVec.size() != 0) // TODO effacer missile quand sort de la window
            {
                randomAlien = rand() % alienVec.size() + 1;

                BlastPlayer blast;
                blast.setPos(sf::Vector2f(playerVec[0].getX(), playerVec[0].getY()));
                blastVec.push_back(blast);

                BlastAlien blastAlien;
                blastAlien.setPos(sf::Vector2f(alienVec[randomAlien].getX(), alienVec[randomAlien].getY()));
                blastAlienVec.push_back(blastAlien);
            }

            isFiring = false;
        }

        /***************************************************                                           
        *                                                  *
        *                   MOVE ALIENS                    *
        *                                                  *                                                 
        ***************************************************/

        // Fetch through the vector to change the position of the alien
        for (auto &alien : alienVec)
        {

            left_alien = alien.getBounds().left;
            right_alien = alien.getBounds().left + alien.getBounds().width;

            if (left_alien <= 0)
            {
                direction = true;
            }
            else if (right_alien >= size_Max)
            {
                direction = false;
            }

            if (direction == true)
            {
                alien.move(3);
            }
            else if (direction == false)
            {
                alien.move(-3);
            }
        }

        /***************************************************                                           
        *                                                  * 
        *                   DRAW SPRITES                   *
        *                   FIRE BLASTS                    *
        *                                                  *                                                 
        ***************************************************/

        // Draw the blast of the player and erase if the blast of the player touches the edge of the screen
        for (int i = 0; i < blastVec.size(); i++)
        {
            blastVec[i].draw(_window, PATH_BLAST);
            blastVec[i].fire(-8);
            if (blastVec[i].getY() <= -5)
            {
                blastVec.erase(blastVec.begin() + i);
            }
        }

        // Draw the blast of the alien and erase if the blast of the alien touches the edge of the screen
        for (int i = 0; i < blastAlienVec.size(); i++)
        {
            blastAlienVec[i].draw(_window, PATH_BLAST_ALIEN);
            blastAlienVec[i].fire(8);
            if (blastAlienVec[i].getY() > 1200)
            {
                blastAlienVec.erase(blastAlienVec.begin() + i);
            }
        }

        // Draw Ship
        if (playerVec.size() != 0)
        {
            //Draw elements
            _window.draw(playerVec[0].getShip());
        }

        // Draw Alien
        for (auto &alien : alienVec)
        {
            alien.draw(_window, PATH_ALIEN);
        }

        // Draw Fence
        for (auto &fence : fenceVec)
        {
            fence.draw(_window, PATH_FENCE);
        }

        //Draw Health
        for (auto &health : healthVec)
        {
            health.draw(_window, PATH_ITEM_HEALT);
        }

        //Draw Speed
        for (auto &health : speedVec)
        {
            health.draw(_window, PATH_ITEM_SPEED);
        }

        /***************************************************                                           
        *                                                  *
        *                 CHECK COLLISIONS                 *
        *                                                  *                                                 
        ***************************************************/

        // Detects if there is a collision between the user's blast and the alien
        for (int i = 0; i < blastVec.size(); i++)
        {

            for (int j = 0; j < alienVec.size(); j++)
            {
                alienVec[j].checkColl(blastVec[i].getBlastPlayer());

                if (alienVec[j].getIsHit() == true)
                {
                    alienVec.erase(alienVec.begin() + j);
                    blastVec.erase(blastVec.begin() + i);
                }
            }

            // Detects if there is a collision between the alien's and player's blast and the fence
            for (int k = 0; k < fenceVec.size(); k++)
            {
                fenceVec[k].checkColl(blastVec[i].getBlastPlayer());

                if (fenceVec[k].getIsHit() == true)
                {
                    blastVec.erase(blastVec.begin() + i);
                }
            }
        }

        // Detects if there is a collision between the alien's blast and the user
        for (int i = 0; i < blastAlienVec.size(); i++)
        {

            if (playerVec.size() != 0)
            {
                playerVec[0].checkColl(blastAlienVec[i].getBlastAlien());

                if (playerVec[0].getIsHit() == true)
                {

                    if (lives == 1)
                    {
                        lives--;

                        playerVec.erase(playerVec.begin());
                        blastVec.clear();
                        blastAlienVec.clear();
                        win = false;
                        loose = true;
                    }
                    else
                    {
                        lives--;
                        blastAlienVec.erase(blastAlienVec.begin() + i);
                        move_ship_x = _window.getSize().x / 2.;
                        move_ship_y = _window.getSize().y / 1.2;
                        playerVec[0].setPos(sf::Vector2f(move_ship_x, move_ship_y));
                    }
                }
            }

            // Detects if there is a collision between the alien's and player's blast and the fence
            for (int j = 0; j < fenceVec.size(); j++)
            {
                fenceVec[j].checkColl(blastAlienVec[i].getBlastAlien());

                if (fenceVec[j].getIsHit() == true)
                {
                    blastAlienVec.erase(blastAlienVec.begin() + i);
                }
            }
        }
        // Detects if there is a collision between the player and the heart item
        for (int i = 0; i < healthVec.size(); i++)
        {
            healthVec[i].checkColl(playerVec[0].getShip());

            if (healthVec[i].getIsHit() == true)
            {
                healthVec.erase(healthVec.begin() + i);
                lives++;
            }
        }

        // Detects if there is a collision between the player and the speed item
        for (int i = 0; i < speedVec.size(); i++)
        {
            speedVec[i].checkColl(playerVec[0].getShip());

            if (speedVec[i].getIsHit() == true)
            {
                speedVec.erase(speedVec.begin() + i);
                SPEED_SPRITE += 8;
            }
        }

        /**********************************************************************                                           
        *                                                                     * 
        *     CHECK NUMBER OF ALIENS AND DISABLE FENCE WICH BLOCK THE ITEM    *
        *                      BARRAGE BLAST OF THE ALIENS                    *
        *                                                                     *                                                 
        ***********************************************************************/

        for (int i = 0; i < fenceVec.size(); i++)
        {

            if (i == 3 && alienVec.size() == 12)
            {
                barrageBlastAlien = true;
                fenceVec.erase(fenceVec.begin() + i);
                limit_ship_1 = 0;
                limit_ship_2 = 1800;
            }
        }

        //Barrage blast of Aliens
        if (barrageBlastAlien == true)
        {

            for (int i = 0; i < 9; i++)
            {
                randomAlien = rand() % alienVec.size() + 1;

                BlastAlien blastAlien;
                blastAlien.setPos(sf::Vector2f(alienVec[randomAlien].getX(), alienVec[randomAlien].getY()));
                blastAlienVec.push_back(blastAlien);
            }

            // Draw the blast of the alien and erase if the blast of the alien touches the edge of the screen
            for (int i = 0; i < blastAlienVec.size(); i++)
            {
                blastAlienVec[i].draw(_window, PATH_BLAST_ALIEN);
                blastAlienVec[i].fire(8);
                if (blastAlienVec[i].getY() > 1200)
                {
                    blastAlienVec.erase(blastAlienVec.begin() + i);
                }
            }

            barrageBlastAlien = false;
        }

        /***************************************************                                           
        *                                                  * 
        *                     DISPLAY                      *
        *                                                  *                                                 
        ***************************************************/

        // Detect if user Win or Lose
        if (alienVec.size() == 0 && win == true)
        {
            this->wideTextWinLoose("YOU WIN !", sf::Color::Green);
        }
        else if (loose == true)
        {
            this->wideTextWinLoose("YOU LOOSE !", sf::Color::Red);
        }

        this->wideTextLives("LIVES : " + std::to_string(lives), sf::Color::Green);

        this->wideTextNumberOfAliens("ALIENS : " + std::to_string(alienVec.size()), sf::Color::Red);

        this->_window.display();
    }
}