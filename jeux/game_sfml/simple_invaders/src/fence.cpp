/*
 *
 * Name  : fence.cpp
 * 
 * Class : Fence
 * 
 * Desc  : Containts all methods of the class Fence
 * 
 */

#include "fence.h"

Fence::Fence()
{
}

void Fence::setPos(sf::Vector2f newPos)
{
    this->fence.setPosition(newPos);
}

void Fence::checkColl(sf::Sprite BlastAlien)
{

    if (this->fence.getGlobalBounds().intersects(BlastAlien.getGlobalBounds()))
    {
        isHit = true;
    }
    else
    {
        isHit = false;
    }
}

void Fence::draw(sf::RenderWindow &window, std::string PATH_TO_FENCE)
{
     if (!this->texture.loadFromFile(PATH_TO_FENCE))
    {
        std::cout << "Error loading image of the fence !" << std::endl;
    }

    this->texture.setSmooth(true);
    this->fence.setTexture(texture);
    this->fenceSize = this->fence.getGlobalBounds();
    this->fence.setOrigin(this->fenceSize.width / 2., this->fenceSize.height / 6.);
    window.draw(this->fence);
}

void Fence::rotate(float rotate)
{
    this->fence.setRotation(rotate);
}

bool Fence::getIsHit()
{
    return this->isHit;
}

sf::Sprite Fence::getFence()
{
    return this->fence;
}