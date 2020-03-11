/*
 *
 * Name  : blastAlien.cpp
 * 
 * Class : BlastAlien
 * 
 * Desc  : Containts the methods of the class BlastAlien
 * 
 */

#include "blastAlien.h"

BlastAlien::BlastAlien()
{
  
}

void BlastAlien::move(int x, int y)
{
    this->alien.setPosition(x, y);
}

void BlastAlien::setPos(sf::Vector2f newPos){
    this->alien.setPosition(newPos);
}

void BlastAlien::fire(int speed){
    this->alien.move(0, speed);
}

void BlastAlien::draw(sf::RenderWindow &window, std::string PATH_TO_BLAST_ALIEN){
    
     if (!this->texture.loadFromFile(PATH_TO_BLAST_ALIEN))
    {
        std::cout << "Error loading image of the blast alien !" << std::endl;
    }
    this->texture.setSmooth(true);

    this->alien.setTexture(texture);
    this->alienSize = this->alien.getGlobalBounds();

    this->alien.setOrigin(this->alienSize.width / 2., this->alienSize.height / 6.);

    window.draw(this->alien);
}

int BlastAlien::getY(){
    return this->alien.getPosition().y;
}

sf::Sprite BlastAlien::getBlastAlien()
{
    return this->alien;
}