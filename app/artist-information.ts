import {Artist} from './artist';
import {ArtPiece} from './art-piece';
export var ARTISTS: Artist[] =
[
    {
        "lastName": "Wisener",
        "id": "1",
        "locationState": "Texas",
        "locationCity": "Houston",
        "firstName": "Cynthia",
        "works": [
            {
                "price": "400",
                "keywords": [
                    "clay",
                    "man"
                ],
                "files": [],
                "mainFile": "../Artists/Artist_1/Work_1/asdkfie.jpg",
                "name": "Black Salt Fire",
                "description": "black clay",
                "media": "Sculpture"
            },
            {
                "price": "400",
                "keywords": [
                    "clay",
                    "man",
                    "sitting"
                ],
                "files": [],
                "mainFile": "../Artists/Artist_1/Work_2/asdf.jpg",
                "name": "Should I Get A Tattoo",
                "description": "man sitting",
                "media": "Sculpture"
            }
        ],
        "profilePic": "profile_1.jpg",
        "media": "Sculpture",
        "numWorks": "2"
    },
    {
        "lastName": "Peter",
        "id": "2",
        "locationState": "Texas",
        "locationCity": "Houston",
        "firstName": "Dude",
        "works": [
            {
                "price": "127.29",
                "keywords": [
                    "numbers",
                    "math",
                    "sin"
                ],
                "files": [],
                "mainFile": "../Artists/Artist_2/Work_1/figure_1-1.png",
                "name": "Sin Wave",
                "description": "mathematical function",
                "media": "Math"
            }
        ],
        "profilePic": "figure_1.png",
        "media": "Beer",
        "numWorks": "1"
    }
];