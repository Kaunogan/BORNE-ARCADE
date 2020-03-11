/*
 *
 * Name  : player.cpp
 * 
 * Class : Player
 * 
 * Desc  : Containts all methods of the class Player
 * 
 */

#include "player.h"

Player::Player(std::string PATH_TO_SHIP)
{

    if (!this->texture.loadFromFile(PATH_TO_SHIP))
    {
        std::cout << "Error loading image of the ship !" << std::endl;
    }

    this->texture.setSmooth(true);
    this->ship.setTexture(texture);
    this->shipSize = this->ship.getGlobalBounds();
    this->ship.setOrigin(this->shipSize.width / 2., this->shipSize.height / 6.);
}

void Player::move(sf::Vector2f direction)
{
    this->ship.move(direction);
}

void Player::setPos(sf::Vector2f newPos)
{
    this->ship.setPosition(newPos);
}

void Player::checkColl(sf::Sprite BlastAlien)
{

    if (this->ship.getGlobalBounds().intersects(BlastAlien.getGlobalBounds()))
    {
        isHit = true;
    }
    else
    {
        isHit = false;
    }
}

void Player::draw(sf::RenderWindow &window)
{
    window.draw(this->ship);
}

int Player::getX()
{
    return this->ship.getPosition().x;
}

int Player::getY()
{
    return this->ship.getPosition().y;
}

bool Player::getIsHit()
{
    return this->isHit;
}

sf::Sprite Player::getShip()
{
    return this->ship;
}