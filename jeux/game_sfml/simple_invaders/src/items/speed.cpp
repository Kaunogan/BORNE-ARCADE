/*
 *
 * Name  : speed.cpp
 * 
 * Class : Speed
 * 
 * Desc  : Containts all methods of the class Speed
 * 
 */

#include "items/speed.h"

Speed::Speed()
{
}

void Speed::setPos(sf::Vector2f newPos)
{
    this->speed.setPosition(newPos);
}

void Speed::checkColl(sf::Sprite BlastAlien)
{

    if (this->speed.getGlobalBounds().intersects(BlastAlien.getGlobalBounds()))
    {
        isHit = true;
    }
    else
    {
        isHit = false;
    }
}

void Speed::draw(sf::RenderWindow &window, std::string PATH_TO_SPEED)
{
     if (!this->texture.loadFromFile(PATH_TO_SPEED))
    {
        std::cout << "Error loading image of the health !" << std::endl;
    }

    this->texture.setSmooth(true);
    this->speed.setTexture(texture);
    this->speedSize = this->speed.getGlobalBounds();
    this->speed.setOrigin(this->speedSize.width / 2., this->speedSize.height / 6.);
    
    window.draw(this->speed);
}

bool Speed::getIsHit()
{
    return this->isHit;
}

sf::Sprite Speed::getSpeed()
{
    return this->speed;
}