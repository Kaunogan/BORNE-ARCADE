#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/OpenGL.hpp>
#include <time.h>
#include <iostream>
using namespace sf;

const int W = 600;
const int H = 480;

const int WIDTH = sf::VideoMode::getDesktopMode().width;
const int HEIGHT = sf::VideoMode::getDesktopMode().height;

std::string playerWin;

sf::Font _font;
sf::Text _full_text;
sf::Text _full_text_Win;

float count_le_down = 10.f;

int speed = 2;
bool field[W][H] = {0};

struct player
{
	int x, y, dir;
	Color color;
	player(Color c)
	{
		x = rand() % W;
		y = rand() % H;
		color = c;
		dir = rand() % 4;
	}
	void tick()
	{
		if (dir == 0)
		{
			y += 1;
		}
		if (dir == 1)
		{
			x -= 1;
		}
		if (dir == 2)
		{
			x += 1;
		}
		if (dir == 3)
		{
			y -= 1;
		}

		if (x >= W)
		{
			x = 0;
		}

		if (x < 0)
		{
			x = W - 1;
		}
		if (y >= H)
		{
			y = 0;
		}
		if (y < 0)
		{
			y = H - 1;
		}
	}

	Vector3f getColor()
	{
		return Vector3f(color.r, color.g, color.b);
	}
};

int main()
{
	srand(time(0));

	RenderWindow window(VideoMode(WIDTH, HEIGHT), "The Tron Game!");
	window.setFramerateLimit(60);

	Texture texture;
	texture.loadFromFile("background.jpg");
	Sprite sBackground(texture);

	_font.loadFromFile("assets/Sansation.ttf");
	_full_text.setFont(_font);
	_full_text.setCharacterSize(50);

	_full_text_Win.setFont(_font);
	_full_text_Win.setCharacterSize(50);

	player p1(Color::Red), p2(Color::Green);

	Sprite sprite;
	RenderTexture t;
	t.create(W, H);
	t.setSmooth(true);
	sprite.setTexture(t.getTexture());
	t.clear();
	t.draw(sBackground);
	sprite.setScale((float)window.getSize().x / (float)t.getSize().x, (float)window.getSize().y / (float)t.getSize().y);

	bool Game = 1;

	while (window.isOpen())
	{
		Event e;
		while (window.pollEvent(e))
		{
			if (e.type == Event::Closed)
				window.close();
		}

		if (Keyboard::isKeyPressed(Keyboard::Left))
			if (p1.dir != 2)
				p1.dir = 1;
		if (Keyboard::isKeyPressed(Keyboard::Right))
			if (p1.dir != 1)
				p1.dir = 2;
		if (Keyboard::isKeyPressed(Keyboard::Up))
			if (p1.dir != 0)
				p1.dir = 3;
		if (Keyboard::isKeyPressed(Keyboard::Down))
			if (p1.dir != 3)
				p1.dir = 0;

		if (Keyboard::isKeyPressed(Keyboard::Q))
			if (p2.dir != 2)
				p2.dir = 1;
		if (Keyboard::isKeyPressed(Keyboard::D))
			if (p2.dir != 1)
				p2.dir = 2;
		if (Keyboard::isKeyPressed(Keyboard::Z))
			if (p2.dir != 0)
				p2.dir = 3;
		if (Keyboard::isKeyPressed(Keyboard::S))
			if (p2.dir != 3)
				p2.dir = 0;

		if (!Game)
		{

			//////draw player win//////
			_full_text_Win.setString("         " + playerWin + "\n Press Enter to continue");
			sf::FloatRect box2 = _full_text_Win.getLocalBounds();
			_full_text_Win.setOrigin(box2.left + box2.width / 2.0f, box2.top + box2.height / 2.0f);
			_full_text_Win.setPosition(WIDTH / 2.0f, HEIGHT / 2.0f);
			_full_text_Win.setFillColor(sf::Color::Yellow);
			window.clear();
			window.draw(sprite);

			window.draw(_full_text_Win);
			window.display();

			if (Keyboard::isKeyPressed(Keyboard::Enter))
			{
				window.close();
			}
			continue;
		}

		for (int i = 0; i < speed; i++)
		{
			p1.tick();
			p2.tick();
			if (field[p1.x][p1.y] == 1)
			{

				playerWin = "PLAYER 1 WIN !";
				Game = 0;
			}
			else if (field[p2.x][p2.y] == 1)
			{
				playerWin = "PLAYER 2 WIN !";
				Game = 0;
			}
			else
			{
				field[p1.x][p1.y] = 1;
				field[p2.x][p2.y] = 1;
				CircleShape c(3);
				c.setPosition(p1.x, p1.y);
				c.setFillColor(p1.color);
				t.draw(c);
				c.setPosition(p2.x, p2.y);
				c.setFillColor(p2.color);
				t.draw(c);
				t.display();
			}
		}

		////// draw  ///////
		window.clear();
		window.draw(sprite);

		window.display();
	}

	return 0;
}
