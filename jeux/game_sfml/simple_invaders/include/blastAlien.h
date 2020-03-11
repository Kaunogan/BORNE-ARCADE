/*
 *
 * Name  : blastAlien.h
 * 
 * Class : BlastAlien
 * 
 * Desc  : The blast of the Alien
 * 
 */


#pragma once
#include "invaders.h"
#include <string>

class BlastAlien
{

private:
    sf::Sprite alien;        // Sprite of the blastPlayer
    sf::Texture texture;      // Texture of the blastPlayer
    sf::FloatRect alienSize; // Get the blastPlayer Size

public:
    BlastAlien();                                     // Constructor
    void move(int, int);                              // Function to move the blastPlayer
    void setPos(sf::Vector2f);                        // Function to set the position of the blastPlayer
    void fire(int);                                   // Function fire a blast
    void draw(sf::RenderWindow &window, std::string); // Function to draw the ship on the window
    
    int getY();
    sf::Sprite getBlastAlien(); // Function to get the blastAlien
};