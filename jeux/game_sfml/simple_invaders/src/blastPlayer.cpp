/*
 *
 * Name  : blastPlayer.cpp
 * 
 * Class : BlastPlayer
 * 
 * Desc  : Containts all methods of the class BlastPlayer
 * 
 */

#include "blastPlayer.h"

BlastPlayer::BlastPlayer()
{  
}

void BlastPlayer::move(int x, int y)
{
    this->blastPlayer.setPosition(x, y);
}

void BlastPlayer::setPos(sf::Vector2f newPos){
    this->blastPlayer.setPosition(newPos);
}

void BlastPlayer::fire(int speed){
    this->blastPlayer.move(0, speed);
}

void BlastPlayer::draw(sf::RenderWindow &window, std::string PATH_TO_BLAST_PLAYER){
    
     if (!this->texture.loadFromFile(PATH_TO_BLAST_PLAYER))
    {
        std::cout << "Error loading image of the blast player !" << std::endl;
    }
    this->texture.setSmooth(true);

    this->blastPlayer.setTexture(texture);
    this->blastPlayerSize = this->blastPlayer.getGlobalBounds();

    this->blastPlayer.setOrigin(this->blastPlayerSize.width / 2., this->blastPlayerSize.height / 6.);

    window.draw(this->blastPlayer);
}

int BlastPlayer::getY(){
    return this->blastPlayer.getPosition().y;
}

sf::Sprite BlastPlayer::getBlastPlayer()
{
    return this->blastPlayer;
}