/*
 *
 * Name  : health.cpp
 * 
 * Class : Health
 * 
 * Desc  : Containts all methods of the class Health
 * 
 */

#include "items/health.h"

Health::Health()
{
}

void Health::setPos(sf::Vector2f newPos)
{
    this->health.setPosition(newPos);
}

void Health::checkColl(sf::Sprite BlastAlien)
{

    if (this->health.getGlobalBounds().intersects(BlastAlien.getGlobalBounds()))
    {
        isHit = true;
    }
    else
    {
        isHit = false;
    }
}

void Health::draw(sf::RenderWindow &window, std::string PATH_TO_HEALTH)
{
     if (!this->texture.loadFromFile(PATH_TO_HEALTH))
    {
        std::cout << "Error loading image of the health !" << std::endl;
    }

    this->texture.setSmooth(true);
    this->health.setTexture(texture);
    this->healthSize = this->health.getGlobalBounds();
    this->health.setOrigin(this->healthSize.width / 2., this->healthSize.height / 6.);
    
    window.draw(this->health);
}

bool Health::getIsHit()
{
    return this->isHit;
}

sf::Sprite Health::getHealth()
{
    return this->health;
}