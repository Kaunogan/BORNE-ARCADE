/*
 *
 * Name  : fence.h
 * 
 * Class : Fence
 * 
 * Desc  : Fence to protect the ship
 * 
 */

#pragma once
#include "invaders.h"

class Fence
{
private:
    sf::Sprite fence;        // Sprite of the fence
    sf::Texture texture;     // Texture of the Fence
    sf::FloatRect fenceSize; // Get the fence Size
    bool isHit = false;      // Check if the fence has been touched by the blast

public:
    Fence();                                          // Constructor
    void setPos(sf::Vector2f);                        // Function to set the position of the fence
    void checkColl(sf::Sprite);                       // Function to check the collision with the blast of the Fence
    void draw(sf::RenderWindow &window, std::string); // Function to draw the fence on the window
    void rotate(float);

    //Get
    bool getIsHit();       // Function to get variable is hit
    sf::Sprite getFence(); // Function to get the Sprite
};