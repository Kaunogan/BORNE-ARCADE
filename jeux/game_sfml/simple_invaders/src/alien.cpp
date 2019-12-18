/*
 *
 * Name  : alien.cpp
 * 
 * Class : Alien
 * 
 * Desc  : Containts the methods of the class Alien
 * 
 */

#include "alien.h"

Alien::Alien()
{  
}

void Alien::setPos(sf::Vector2f newPos){
    this->alien.setPosition(newPos);
}

void Alien::draw(sf::RenderWindow &window, std::string PATH_TO_ALIEN){
    
     if (!this->texture.loadFromFile(PATH_TO_ALIEN))
    {
        std::cout << "Error loading image of the alien !" << std::endl;
    }
    this->texture.setSmooth(true);

    this->alien.setTexture(texture);
    this->alienSize = this->alien.getGlobalBounds();

    window.draw(this->alien);
}

void Alien::checkColl(sf::Sprite blast){
    
    if(this->alien.getGlobalBounds().intersects(blast.getGlobalBounds())){
        isHit = true;
    } else {
        isHit = false;
    }
}

void Alien::move(int speed){
    this->alien.move(speed, 0);
}

bool Alien::getIsHit(){
    return this->isHit;
}

sf::FloatRect Alien::getBounds() {
    this->alienSize = this->alien.getGlobalBounds();
    return this->alienSize;
}

sf::Sprite Alien::getAlien()
{
    return this->alien;
}

int Alien::getX(){
    return this->alien.getPosition().x;
}

int Alien::getY(){
    return this->alien.getPosition().y;
}