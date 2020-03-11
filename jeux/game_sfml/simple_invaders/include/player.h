/*
 *
 * Name  : player.h
 * 
 * Class : Player
 * 
 * Desc  : User move the ship with the arrows, fire with space
 * 
 */

#pragma once
#include "invaders.h"

class Player
{
private:
    sf::Sprite ship;        // Sprite of the ship
    sf::Texture texture;    // Texture of the Ship
    sf::FloatRect shipSize; // Get the ship Size
    bool isHit = false;     // Check if the player has been touched by the blast

public:
    Player(std::string);                 // Constructor
    void move(sf::Vector2f);             // Function to move the ship
    void setPos(sf::Vector2f);           // Function to set the position of the ship
    void checkColl(sf::Sprite);          // Function to check the collision with the blast of the Alien
    void draw(sf::RenderWindow &window); // Function to draw the ship on the window

    //Get
    int getX();
    int getY();
    bool getIsHit();      // Function to get variable is hit
    sf::Sprite getShip(); // Function to get the Sprite
};