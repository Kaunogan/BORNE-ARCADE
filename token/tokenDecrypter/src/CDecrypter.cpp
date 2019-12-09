#include "../include/CDecrypter.h"

CDecrypter::CDecrypter()
{
}

CDecrypter::~CDecrypter()
{
}

void CDecrypter::parseToken(std::string token)
{
    /* S930275 */

    // Get string of token
    this->string_code = token.substr(0, 1);
    this->string_key = token.substr(1, 3);
    this->string_date = token.substr(4, 2);
    this->string_party = token.substr(6, 1);

    // Convert string into int
    this->key = std::stoi(this->string_key, nullptr, 10);
    this->date = std::stoi(this->string_date, nullptr, 10);
    this->party = std::stoi(this->string_party, nullptr, 10);

    this->token = token;
}

void CDecrypter::decrypt()
{

    /*
     **********************************
     *                                *
     *      Section decrypt code      *
     *                                *
     **********************************
     */

    std::cout << "Vérification du code" << std::endl;

    this->string_decrypt_code = this->string_code;

    if (!crypter)
    {
        this->key = -this->key;
    }
    for (std::string::iterator it = this->string_decrypt_code.begin(); it < this->string_decrypt_code.end(); ++it)
    {
        if (isupper(*it))
        {
            *it = 'A' + this->modulo(*it - 'A' + this->key, 26);
        }
        else if (islower(*it))
        {
            *it = 'a' + this->modulo(*it - 'a' + this->key, 26);
        }
    }

    if (this->string_decrypt_code == "Y")
    {
        std::cout << "Code valide ! " << std::endl;
        code_ok = true;
    }
    else
    {
        std::cout << "Code invalide ! " << std::endl;
        code_ok = false;
    }

    /*
     **********************************
     *                                *
     *      Section check date        *
     *                                *
     **********************************
     */

    std::cout << "Vérification de la date" << std::endl;
    time(&tt);
    tm TM = *localtime(&tt);

    if ((this->date / 3) == TM.tm_mday)
    {
        std::cout << "Date valide !" << std::endl;
        date_ok = true;
    }
    else
    {
        std::cout << "Date invalide !" << std::endl;
        date_ok = false;
    }

    /*
     **********************************
     *                                *
     *          Verifications         *
     *                                *
     **********************************
     */

    for (int i = 0; i < this->vectorTokenUsed.size(); i++)
    {
        if (this->vectorTokenUsed[i] == this->token)
        {
            code_ok = false;
            date_ok = false;
            token_used = true;
            std::cout << "Token déjà utilisé !" << std::endl;
        }
    }

    if (code_ok == true && date_ok == true)
    {
        std::cout << "Vérification ok, nombre de jetons : " + std::to_string(this->party) << std::endl;
        std::cout << "Token "+this->token+" inserted in vectorTokenUsed" << std::endl;

        // Push token in vector of token used
        vectorTokenUsed.push_back(this->token);
    }
    else if (token_used != true)
    {
        std::cout << "Erreur token invalide, veuillez re-essayer" << std::endl;
    }

    /*
     **********************************
     *                                *
     *   Clear the vector at midnight *
     *                                *
     **********************************
     */

    //TODO
}

int CDecrypter::modulo(int m, int n)
{
    return m >= 0 ? m % n : (n - abs(m % n)) % n;
}

int CDecrypter::getParty()
{
    return this->party;
}