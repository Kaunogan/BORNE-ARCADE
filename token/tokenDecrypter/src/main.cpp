#include "CDecrypter.cpp"
#include <iostream>

using namespace std;

int main(int argc, char const *argv[])
{
    string token;

    //Instanciate object CDecrypter
    CDecrypter decrypter;

    cout << "Votre code : " << endl;

    cin >> token;

    decrypter.parseToken(token);
    decrypter.decrypt();

    return 0;
}
