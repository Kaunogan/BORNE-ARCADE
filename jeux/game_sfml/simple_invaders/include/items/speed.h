/*
 *
 * Name  : speed.h
 * 
 * Class : Speed
 * 
 * Desc  : Add speed to the user
 * 
 */

#pragma once
#include "invaders.h"

class Speed
{
private:
    sf::Sprite speed;        // Sprite of the healt
    sf::Texture texture;     // Texture of the Health
    sf::FloatRect speedSize; // Get the healt Size
    bool isHit = false;      // Check if the healt has been touched by the ship

public:
    Speed();                                          // Constructor
    void setPos(sf::Vector2f);                        // Function to set the position of the healt
    void checkColl(sf::Sprite);                       // Function to check the collision with the blast of the healt
    void draw(sf::RenderWindow &window, std::string); // Function to draw the healt on the window

    //Get
    bool getIsHit();       // Function to get variable is hit
    sf::Sprite getSpeed(); // Function to get the Sprite
};