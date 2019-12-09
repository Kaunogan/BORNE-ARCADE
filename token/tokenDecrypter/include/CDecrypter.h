#include <iostream>
#include <string>
#include <climits>
#include <cstdlib>
#include <iomanip>
#include <ctime>
#include <vector>

class CDecrypter
{

private:
    // String of token
    std::string string_code;
    std::string string_decrypt_code;
    std::string string_key;
    std::string string_date;
    std::string string_party;

    // Int of token
    int key;
    int date;
    int party;

    // Boolean
    bool crypter;
    bool code_ok;
    bool date_ok;
    bool token_used;

    //Token
    std::string token;

    // Time
    time_t tt;
    
    //vector of token used
    std::vector <std::string> vectorTokenUsed; 

public:
    CDecrypter();
    ~CDecrypter();
    void parseToken(std::string);
    void decrypt();
    int getParty();
    int modulo(int, int);
};
