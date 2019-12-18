/*
 *
 * Name  : alien.h
 * 
 * Class : Alien
 * 
 * Desc  : Alien auto move and fire blast to the player
 * 
 */

#pragma once
#include "invaders.h"
#include <string>
#include <iostream>

class Alien
{

private:
    sf::Sprite alien;        // Sprite of the alien
    sf::Texture texture;     // Texture of the Alien
    sf::FloatRect alienSize; // Get the Alien Size
    bool isHit = false;      // Check if the alien has been touched by the blast

public:
    Alien();                                          // Constructor
    void setPos(sf::Vector2f);                        // Function to set the position of the alien
    void draw(sf::RenderWindow &window, std::string); // Function to draw the ship on the window
    void checkColl(sf::Sprite);                       // Function to check the collision with the blast of the Player
    void move(int);                                   // Function to move the alien

    bool getIsHit();           // Function to get variable is hit
    sf::FloatRect getBounds(); // Function to get the Bounds
    sf::Sprite getAlien();     // Function to get the Alien
    int getX();
    int getY();
};