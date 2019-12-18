/*
 *
 * Name  : blastPlayer.h
 * 
 * Class : BlastPlayer
 * 
 * Desc  : The blast of the player
 * 
 */

#pragma once
#include "invaders.h"
#include <string>

class BlastPlayer
{

private:
    sf::Sprite blastPlayer;        // Sprite of the blastPlayer
    sf::Texture texture;           // Texture of the blastPlayer
    sf::FloatRect blastPlayerSize; // Get the blastPlayer Size

public:
    BlastPlayer();                                    // Constructor
    void move(int, int);                              // Function to move the blastPlayer
    void setPos(sf::Vector2f);                        // Function to set the position of the blastPlayer
    void fire(int);                                   // Function fire a blast
    void draw(sf::RenderWindow &window, std::string); // Function to draw the ship on the window

    int getY();
    sf::Sprite getBlastPlayer(); // Function to get the blastPlayer
};