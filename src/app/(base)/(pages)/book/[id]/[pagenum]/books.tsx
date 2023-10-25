import { Book } from "@/util/BookData";

export const books: Book[] = [
  {
    BookId: 1,
    title: "Book 1 test",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["In this activity well go over different patterns and how to identify them.",
          "What is a pattern?",
          "Patterns and functions can be represented in many ways and described using words, tables, graphs, and symbols."
        ],
        image: "/lego-sort-example-clumping.png",
        game: null
      },
      {
        content: ["This is the first activity",
          "Lets try creating the pattern: Red, Red, Blue, Blue"],
        image: "/lego-sort-example-clumping.png",
        game: "color"
      },
      {
        content: ["Ok that wasn't too bad lets see how we do with numerical patterns.",
          "Lets try completing the pattern now!"],
        image: "/lego-sort-example-clumping.png",
        game: "number"
      },
      {
        content: ["Try completing this code snippet!"],
        image: "/lego-sort-example-clumping.png",
        game: "code"
      },
    ],
  },
  {
    BookId: 2,
    title: "Variables With Coloring",
    blurb: "Learn about different variables types, coloring the Hokie Bird!",
    author: "Dev",
    pages: [
      {
        content: ["In this book we will discover how to drag and drop different colors into variables",
          "We will also learn how to manually complete vairables!",
        ],
        image: "/HokieBird.png",
      },
      {
        content: ["Here you are able to drag and drop the different colors into the three differnt parts of the Hokie Bird.",
          "The Hokie Bird is split into three parts; a head, a body, and the legs.",
          "Try dragging different colors and see the changes happen live!",
          "Notice how the value on the right hand side changes when a color is dropped, this is the assignment of a variable"
        ],
        image: "HokieBirdActivity",
        props: {
          draggable: true,
          command: "Drag the Colors over these boxes",
        }
      },
      {
        content: ["Now that you assigned variables by dragging values over them, lets try typing in the colors!",
          "Click on the part of the Hokie Bird you would like to color and type in any of the listed colors",
          "After pressing enter the values should update the color of the bird"
        ],
        image: "HokieBirdActivity",
        props: {
          type: true,
          command: "Type the Colors over these boxes",
        }
      },
      {
        content: ["now, you know how to set color for each part, you can type body part with corresponding color"
        ],
        image: "HokieBirdActivity",
        props: {
          type: true,
          typeVariable: true,
          command: "Type the Body Part and Colors over these boxes",
        }
      },
    ],
  },
  {
    BookId: 3,
    title: "If-condition and For-loop with HokieBird Maze",
    blurb: "Learn about if-condition and for-loop with the Hokie Bird Maze!",
    author: "Dev",
    pages: [
      // {
      //   content: ["There will be a football game at Virginia Tech this afternoon,",
      //     "and HokieBird is one of the participants.",
      //     "Unfortunately, HokieBird does not know where Lane Stadium is",
      //     "If you would like to help HokieBird, please click the Next button.",
      //     "Go to the next page and enter the game.",
      //   ],
      //   image: "/SadHokieBird.png",
      // },
      {
        content: ["The game is about to start, and HokieBird is very worried when he got lost. ",
          "We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true the 'code' that immediatley follows is taken.",
          "If the value is false then the 'code' that follows is ignored",
          "For the next few examples we will use the commands move to move the bird forward",
          "To make the Hokiebird turn right or left we will use hokeBird.turnRight() or hokieBird.turnLeft()"
        ],
        image: "/HokieBirdMaze.png",
      },
      {
        content: ["Since we now know how to move the hokeiBird around, we need to determine what actions we should do.",
          "This is where the If statement comes in, we know that if there is a square infront of the bird then we can move",
          "We also know that if the road turns right or left we can move the hokie bird",
          "We will check multiple conditions",
          "The first condition will be can_move_forward, this is used to move the bird forward",
          "Turning left and right is similar with the functions can_turn_left and can_turn_right",
          "Placing any of these commands in the if statement will either make it true or false",
          "If the condition is false then the statement in the else block will be used instead"
        ],
        image: "/HokieBirdMaze.png",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "The Statements are in red and conditions are in blue",
          "When you are ready to test, click the Run button"
        ],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze1.png",
          pageNum: 2,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work! Now we need to turn the hokieBird", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze2.png",
          pageNum: 3,
          bookID: 3,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Nicely done! Keep Going!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze3.png",
          pageNum: 4,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work! Now we need to turn the HokieBird", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze4.png",
          pageNum: 5,
          bookID: 3,
          ans: {
            condition: "can_turn_left",
            statement: "turn_left"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze5.png",
          pageNum: 6,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze6.png",
          pageNum: 7,
          bookID: 3,
          ans: {
            condition: "can_turn_left",
            statement: "turn_left"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze7.png",
          pageNum: 8,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze8.png",
          pageNum: 9,
          bookID: 3,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze9.png",
          pageNum: 10,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze10.png",
          pageNum: 11,
          bookID: 3,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze11.png",
          pageNum: 12,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze12.png",
          pageNum: 13,
          bookID: 3,
          ans: {
            condition: "can_turn_left",
            statement: "hokieBird.turnLeft()"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          image: "Maze13.png",
          pageNum: 14,
          bookID: 3,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: false,
          image: "Maze14.png",
          pageNum: 15,
          bookID: 3,
          finished: true
        }
      },
    ]
  },
  {
    BookId: 4,
    title: "If-condition and For-loop with HokieBird Maze Code Completion",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["The game is about to start, and HokieBird is very worried when he got lost. ",
          "We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true the 'code' that immediatley follows is taken.",
          "If the value is false then the 'code' that follows is ignored",
          "For the next few examples we will use the commands move to move the bird forward",
          "To make the Hokiebird turn right or left we will use hokeBird.turnRight() or hokieBird.turnLeft()"
        ],
        image: "/HokieBirdMaze.png",
      },
      {
        content: ["Since we now know how to move the hokeiBird around, we need to determine what actions we should do.",
          "This is where the If statement comes in, we know that if there is a square infront of the bird then we can move",
          "We also know that if the road turns right or left we can move the hokie bird",
          "We will check multiple conditions",
          "The first condition will be can_move_forward, this is used to move the bird forward",
          "Turning left and right is similar with the functions can_turn_left and can_turn_right",
          "Placing any of these commands in the if statement will either make it true or false",
          "If the condition is false then the statement in the else block will be used instead"
        ],
        image: "/HokieBirdMaze.png",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "The Statements are in red and conditions are in blue",
          "When you are ready to test, click the Run button"
        ],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze1.png",
          pageNum: 2,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work! Now we need to turn the hokieBird", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze2.png",
          pageNum: 3,
          bookID: 4,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Nicely done! Keep Going!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze3.png",
          pageNum: 4,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work! Now we need to turn the HokieBird", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze4.png",
          pageNum: 5,
          bookID: 4,
          ans: {
            condition: "can_turn_left",
            statement: "hokieBird.turnLeft()"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze5.png",
          pageNum: 6,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze6.png",
          pageNum: 7,
          bookID: 4,
          ans: {
            condition: "can_turn_left",
            statement: "hokieBird.turnLeft()"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze7.png",
          pageNum: 8,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze8.png",
          pageNum: 9,
          bookID: 4,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze9.png",
          pageNum: 10,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze10.png",
          pageNum: 11,
          bookID: 4,
          ans: {
            condition: "can_turn_right",
            statement: "turn_right"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze11.png",
          pageNum: 12,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze12.png",
          pageNum: 13,
          bookID: 4,
          ans: {
            condition: "can_turn_left",
            statement: "hokieBird.turnLeft()"
          }
        }
      },
      {
        content: ["Good Work!", "The Statements are in red and conditions are in blue"],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          image: "Maze13.png",
          pageNum: 14,
          bookID: 4,
          ans: {
            condition: "can_move_forward",
            statement: "move"
          }
        }
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
        image: "HokieBirdMazeActivity",
        props: {
          type: false,
          image: "Maze14.png",
          pageNum: 15,
          bookID: 4,
          finished: true
        }
      }
    ]
  },
  {
    BookId: 5,
    title: "If-condition and For-loop with HokieBird Maze",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["Come to Hand-in-Hand Park in Blacksburg, Virginia.",
          "You'll find swings to play on, make new friends, and enjoy the shade of big trees.",
          "It's a fun and friendly place for everyone.",
          "Take a break from the hustle and bustle and unwind in this peaceful oasis."],
        image: "/io_book/park.png",
      },
      {
        content: ["Welcome to Hand-in-Hand Park!",
          "This is a place where you can play with your friends and have fun.",
          "You can also learn about the different types of trees that grow here.",
          "Let's get started!"],
        image: "/io_book/intro.png"


      },
    ]
  },
  {
    BookId: 6,
    title: "If-condition and For-loop with HokieBird Maze",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["If-condition is to see if the conditions is satistfied or not to determine which situation to reach.",
          "If-statement diagram is a very common strategy to solve if-condition problems.",
          "You can try the following question with the if-statement diagram on the left.",
          "Example:",
          "If it is a hot day, then HokieBird need to wear a T-shirt.",
          "If it is a chilly day, then HokieBird need to wear a Winter-jacket.",
        ],
        image: "/if_condition/if-statement.png",
      },
      {
        content: ["We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true the 'code' that immediatley follows is taken.",
          "If the value is false then the 'code' that follows is ignored",],
        image: "/if_condition/HokieBirdIf.png",
      },
      {
        content: ["Lets start with dragging and drop statements that should happen if the condition is true!",
          "This means that whatever the if conditon, what is inside the '()', is true the statement will happen!",
          "Here the HokieBird is outside and the temperature is around 70 degrees, not too cold, not too hot, lets dress him!",
          "When youre done move onto the next page with the next button"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["tshirt", "winter_jacket"],
          condition: "weather_is_hot",
          ans: "tshirt",
          image: "/if_condition/sun.gif",
          ans_image: "/if_condition/HokieBirdHot.gif"
        }
      },
      {
        content: ["Awesome work!",
          "Now lets give the hokie bird some warmer clothes as its a lot colder out...brrrrr"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["tshirt", "winter_jacket"],
          condition: "weather_is_cold",
          ans: "winter_jacket",
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/HokieBirdJacket.png",
          effect: "/if_condition/snow.gif"
        }
      },
      {
        content: ["Awesome work!",
          "Now lets give the hokie bird some warmer clothes as its a lot colder out...brrrrr"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["sunglasses", "umbrella"],
          condition: "weather_is_raining",
          ans: "umbrella",
          image: "/if_condition/HokieBirdIf2.png",
          ans_image: "/if_condition/Umbrella.png",
          effect: "/if_condition/rain.gif"
        }

      },
      {
        content: ["Awesome work!",
          "Now lets give the hokie bird some warmer clothes as its a lot colder out...brrrrr"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh"],
          condition: "rains_without_an_umbrella",
          ans: "cry",
          image: "/if_condition/HokieBirdIf2.png",
          ans_image: "/if_condition/HokieBirdCry.jpg",
          effect: "/if_condition/rain.gif"
        }

      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "/if_condition/mood.gif",
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie feels sad",
          ans: "cry",
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/sad.png",
        }
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie feels happy",
          ans: "laugh",
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/happy.png",
        }
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie feels angry",
          ans: "angry",
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/angry.png",
        }
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie feels surprised",
          ans: "surprised",
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/surprise.png",
        }
      },
      {
        content: ["Recently, HokieBird picked up a few dancing steps, although he frequently forgets them.",
          "Let's assist him in repeatedly practicing the moves!",
        "The appropriate dance steps are: action1(bend sideways), action2(back kick), action3(butt twist), action4(wave arm), action5(rotate)"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["bend sideways", "back kick", "butt twist", "wave arm", "rotate"],
          condition: "HokieBird make the action1",
          ans: "bend sideways",
          image: "/if_condition/ready.gif",
          ans_image: "/if_condition/action1.gif",
        }
      },
      {
        content: ["Recently, HokieBird picked up a few dancing steps, although he frequently forgets them.",
          "Let's assist him in repeatedly practicing the moves!",
        "The appropriate dance steps are: action1(bend sideways), action2(back kick), action3(butt twist), action4(wave arm), action5(rotate)"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["bend sideways", "back kick", "butt twist", "wave arm", "rotate"],
          condition: "HokieBird make the action4",
          ans: "wave arm",
          image: "/if_condition/ready.gif",
          ans_image: "/if_condition/action4.gif",
        }
      },
      {
        content: ["Recently, HokieBird picked up a few dancing steps, although he frequently forgets them.",
          "Let's assist him in repeatedly practicing the moves!",
        "The appropriate dance steps are: action1(bend sideways), action2(back kick), action3(butt twist), action4(wave arm), action5(rotate)"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["bend sideways", "back kick", "butt twist", "wave arm", "rotate"],
          condition: "HokieBird make the action3",
          ans: "butt twist",
          image: "/if_condition/ready.gif",
          ans_image: "/if_condition/action3.gif",
        }
      },
      {
        content: ["Recently, HokieBird picked up a few dancing steps, although he frequently forgets them.",
          "Let's assist him in repeatedly practicing the moves!",
        "The appropriate dance steps are: action1(bend sideways), action2(back kick), action3(butt twist), action4(wave arm), action5(rotate)"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["bend sideways", "back kick", "butt twist", "wave arm", "rotate"],
          condition: "HokieBird make the action5",
          ans: "rotate",
          image: "/if_condition/ready.gif",
          ans_image: "/if_condition/action5.gif",
        }
      },
      {
        content: ["Recently, HokieBird picked up a few dancing steps, although he frequently forgets them.",
          "Let's assist him in repeatedly practicing the moves!",
        "The appropriate dance steps are: action1(bend sideways), action2(back kick), action3(butt twist), action4(wave arm), action5(rotate)"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["bend sideways", "back kick", "butt twist", "wave arm", "rotate"],
          condition: "HokieBird make the action2",
          ans: "back kick",
          image: "/if_condition/ready.gif",
          ans_image: "/if_condition/action2.gif",
        }
      },
      {
        content: ["Thank you for your help!!!",
        "HokieBird successfully memorized all the dancing steps!"],
        image: "/if_condition/thanks.gif"
      },
    ]
  }
] as Book[]