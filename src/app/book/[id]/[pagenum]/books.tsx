import { Book } from "@/util/BookData";

export const books: Book[] = [
  {
    BookId: 1,
    bookCover: "/color_2.png",
    title: "Variables With Coloring",
    blurb: "Learn about different variables types, coloring the Hokie Bird!",
    author: "Dev",
    pages: [
      {
        content: ["In this book we will discover how to drag and drop different colors into variables",
          "We will also learn how to manually complete variables!",
        ],
        image: "/HokieBird.png",
      },
      {
        content: ["Here you are able to drag and drop the different colors into the seven different parts of the Hokie Bird.",
          "The Hokie Bird is split into seven parts; the head, the neck, the body, the left leg, the right leg, the left foot and the right foot.",
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
    BookId: 2,
    bookCover: "/color_3.png",
    title: "Hokie Bird is Lost!",
    blurb: "Learn how to communicate specific instructions to the Hokie Bird to help them find their way!",
    author: "Dev",
    pages: [
      {
        content: ["The game is about to start, and HokieBird is very worried when he got lost. ",
          "We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true, the code that immediately follows is taken.",
          "If the value is false then the code that follows is ignored",
          "For the next few examples we will use the commands move to move the bird forward",
          "To make the HokieBird turn right or left we will use hokeBird.turnRight() or hokieBird.turnLeft()"
        ],
        image: "/Maze/SadHokieBird.png",
      },
      {
        content: ["Since we now know how to move the HokieBird around, we need to determine what actions we should do.",
          "This is where the If statement comes in, we know that if there is a square in front of the bird then we can move",
          "We also know that if the road turns right or left we can move the hokie bird",
          "We will check multiple conditions",
          "The first condition will be can_move_forward, this is used to move the bird forward",
          "Turning left and right is similar with the functions can_turn_left() and can_turn_right()",
          "Placing any of these commands in the if statement will either make it true or false",
          "If the condition is false then the statement in the else block will be used instead"
        ],
        image: "/Maze/SadHokieBird.png",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "Drag the purple commands into the statement box!",
          "When you are ready to test, click the Run button"
        ],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          images: [
            "Maze1.png",
            "Maze2.jpg",
            "Maze3.png",
            "Maze4.jpg",
            "Maze5.png",
            "Maze6.jpg",
            "Maze7.png",
            "Maze8.jpg",
            "Maze9.png",
            "Maze10.jpg",
            "Maze11.png",
            "Maze12.jpg",
            "Maze13.png",
            "Maze14.png",
          ],
          pageNum: 2,
          bookID: 2,
          ans: [
            "move(3)",
            "turn_right()",
            "move(2)",
            "turn_left()",
            "move(2)",
            "turn_left()",
            "move(2)",
            "turn_right()",
            "move(3)",
            "turn_right()",
            "move(4)",
            "turn_left()",
            "move(2)",
          ],
        },
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
        image: "/Maze/Maze14.png",
      },
      {
        content: [
          "Oh no now the hokie bird is lost somewhere else <need to fill new place with images and map>",
          "this will be non draggable",
        ],
        image: "/Maze/SadHokieBird.png",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "Drag the purple commands into the statement box!",
          "When you are ready to test, click the Run button"
        ],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          draggable: false,
          images: [
            "Maze1.png",
            "Maze2.jpg",
            "Maze3.png",
            "Maze4.jpg",
            "Maze5.png",
            "Maze6.jpg",
            "Maze7.png",
            "Maze8.jpg",
            "Maze9.png",
            "Maze10.jpg",
            "Maze11.png",
            "Maze12.jpg",
            "Maze13.png",
            "Maze14.png",
          ],
          pageNum: 2,
          bookID: 2,
          ans: [
            "move(3)",
            "turn_right()",
            "move(2)",
            "turn_left()",
            "move(2)",
            "turn_left()",
            "move(2)",
            "turn_right()",
            "move(3)",
            "turn_right()",
            "move(4)",
            "turn_left()",
            "move(2)",
          ]
        },
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
        image: "/Maze/Maze14.png",
      },
    ]
  },
  {
    BookId: 3,
    title: "IO Hand In Hand",
    bookCover: "/lighter_orange.png",
    blurb: "Learn about how a computer can compute patterns!",
    author: "Prapti",
    pages: [
      {
        content: ["Come to Hand-in-Hand Park in Blacksburg, Virginia.",
          "You'll find swings to play on, make new friends, and enjoy the shade of big trees.",
          "It's a fun and friendly place for everyone.",
          "Take a break from the hustle and bustle and unwind in this peaceful oasis."],
        image: "/io_book/hand-in-hand.png",
      },
      {
        content: [
          "Hello, My name is Sarah! Today we will learn about Input/Output.",
          "Let’s chat with the computer and explore the park!"],
        image: "/io_book/def.png"
      },
      {
        content: ["Let's start by trying to count the number of slides in the park.", "How many slides are there in the park?"],
        image: "/io_book/park_1.png",
        game: "NumberInputActivity",
        props: {
          showIOLabels: true,
          options: [1, 2, 3, 4],
          ans: [3],
        },
      },
      {
        content: [
          "Hope you had fun. Let's see what the definition for input and output is before we move forward!",
          "Input",
          "It is the stuff you tell a computer. It's the information or instructions you give to a computer so it can do something.",
          "Output",
          "It is what the computer gives back to you after it does something with the input. It's the computer's answer."
        ],
        image: "/io_book/def.png",
      },
      {
        content: [
          "Hey! Let's hop on to the next activity.",
          "Now, we will play with the flowers in the park."
        ],
        image: "/io_book/def.png",
      },
      {
        content: ["Look at each corner of the park", "How many yellow flowers are there in total in all the corners?"],
        image: "/io_book/flowers_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [9, 10, 11, 12],
          ans: [10],
        },
      },
      {
        content: ["How many pink flowers are there in total in all the corners?"],
        image: "/io_book/flowers_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [9, 10, 11, 12],
          ans: [9],
        },
      },
      {
        content: ["What is the total number of flowers in all the corners right now?"],
        image: "/io_book/flowers_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [19, 20, 21, 22],
          ans: [19],
        },
      },
      {
        content: [
          "Observe the pattern in the number of yellow and pink flowers in every corner",
          "Now guess the number of pink flowers that should be planted in the last row?"
        ],
        game: "TableCompletionActivity",
        image: "/io_book/flowers_1.png",
        props: {
          image: "/io_book/flowers_1.png",
          ans: [5]
        },
      },
      {
        content: ["Look at each corner of the park", "How many yellow trees are there in total in all the corners?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [10, 11, 12, 13],
          ans: [10],
        },
      },
      {
        content: ["How many green trees are there in total in all the corners?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [7, 8, 9, 10],
          ans: [9],
        },
      },
      {
        content: ["What is the total number of trees in all the corners right now?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [16, 17, 18, 19],
          ans: [19],
        },
      },
      {
        content: ["Look at each corner of the park", "How many yellow trees are there in total in all the corners?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [10, 11, 12, 13],
          ans: [10],
        },
      },
      {
        content: ["How many green trees are there in total in all the corners?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [7, 8, 9, 10],
          ans: [9],
        },
      },
      {
        content: ["What is the total number of trees in all the corners right now?"],
        image: "/io_book/trees_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [16, 17, 18, 19],
          ans: [19],
        },
      },
      {
        content: [
          "Each corner of the park has certain number of green and yellow trees.  Observe the pattern in the number of each color tree planted.",
          "Now guess the number green trees that should be planted in the right corner in bottom? "
        ],
        game: "TableCompletionActivityTrees",
        image: "/io_book/trees_1.png",
        props: {
          image: "/io_book/trees_1.png",
          ans: [1]
        },
      },
      {
        content: ["What is the total number of trees in all the corners right now?"],
        image: "/io_book/multiplication_0.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [4, 5, 6, 7],
          answer: [6],
        }
      },
      {
        content: ["What is the number of flowers along side each tree?"],
        image: "/io_book/multiplication_1.png",
        game: "FlowerInputActivity",
        props: {
          showIOLabels: true,
          options: [1, 2, 3, 4],
          answer: [2],
        }
      },
      {
        content: [
          "Each corner of the park has certain number of green and yellow trees.  Observe the pattern in the number of each color tree planted.", 
        "Now guess the number green trees that should be planted in the right corner in bottom? "
        ],
        game: "MultiplicationActivity",
        image: "/io_book/multiplication_2.png",
        props: {image: "/io_book/multiplication_2.png"},

      }
    ]
  },
  {
    BookId: 4,
    bookCover: "/lighter_maroon.png",
    title: "If-condition with HokieBird Weathers",
    blurb: "Learn when and when not a command will run with HokieBird!",
    author: "Dev",
    pages: [
      {
        content: ["We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true the 'code' that immediatley follows is taken.",
          "If the value is false then the 'code' that follows is ignored",],
        image: "/if_condition/HokieBirdIf.png",
      },
      {
        content: [
          "If-statement diagram is a very common strategy to solve if-condition problems.",
          "You can try the following question with the if-statement diagram on the left.",
          "Example:",
          "If it is a hot day, then HokieBird need to wear a T-shirt.",
          "If it is a chilly day, then HokieBird need to wear a Winter-jacket.",
        ],
        image: "/if_condition/if-statement.png",
      },
      {
        content: ["Lets start with dragging and drop statements that should happen if the condition is true!",
          "This means that whatever the if condition, what is inside the '()', is true the statement will happen!",
          "Here the HokieBird is outside and the temperature is around 70 degrees, not too cold, not too hot, lets dress him!",
          "When you're done move onto the next page with the next button"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["tshirt", "winter_jacket"],
          condition: "weather_is_hot",
          ans: ["tshirt"],
          image: "/if_condition/sun.gif",
          ans_image: "/if_condition/HokieBirdSun.gif"
        },
      },
      {
        content: ["Awesome work!",
          "Now, it's snowing and it's really cold! What do we wear when it's cold?", 
          "That's right, warm clothes! ",
          "Let's dress HokieBird in warm clothes!"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["tshirt", "winter_jacket"],
          condition: "weather_is_cold",
          ans: ["winter_jacket"],
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/HokieBirdJacket.png",
          effect: "/if_condition/snow.gif"
        },
      },
      {
        content: ["Awesome work!",
          "It's raining now. Does HokieBird need sunglasses or an umbrella? Help HokieBird choose!"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["sunglasses", "umbrella"],
          condition: "weather_is_raining",
          ans: ["umbrella"],
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/Umbrella2.png",
          effect: "/if_condition/rain.gif"
        },

      },
      {
        content: ["Awesome work!",
          "Oops! It's raining and HokieBird forgot his umbrella! How is he supposed to be feeling?"],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh"],
          condition: "rains_without_an_umbrella",
          ans: ["cry"],
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/HokieBirdCry.png",
          effect: "/if_condition/rain.gif"
        },
      },
    ]
  },
  {
    BookId: 5,
    title: "If-condition with HokieBird Mood",
    bookCover: "/lighter_maroon.png",
    blurb: "Learn when and when not a command will run with HokieBird!",
    author: "Dev",
    pages: [
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
          condition: "Hokie_feels_sad",
          ans: ["cry"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/sad.png",
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_happy",
          ans: ["laugh"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/happy.png",
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_angry",
          ans: ["angry"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/angry.png",
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions. ",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_surprised",
          ans: ["surprised"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/surprise.png",
        },
      },
    ]
  },
  {
    BookId: 6,
    title: "If-condition with HokieBird Dance",
    bookCover: "/lighter_maroon.png",
    blurb: "Learn when and when not a command will run with HokieBird!",
    author: "Dev",
    cover: "/if_condition/HokieBirdIf.png",
    pages:
      [
        {
          content: ["HokieBird took an introductory dance technique class this semester,",
            "using the outdoor space to improve his fitness. ",
            "But there's a dance exam coming up and HokieBird needs to go and memorize the order of all the dance steps.",
            " Let's help HokieBird! Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers."],
          image: "/if_condition/dance.jpg",
        },
        {
          content: ["Let's assist him in repeatedly practicing the moves!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action1",
            ans: ["bend_sideways"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action1.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action4",
            ans: ["wave_arm"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action4.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action3",
            ans: ["butt_twist"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action3.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action5",
            ans: ["rotate"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action5.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize the final move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action2",
            ans: ["back_kick"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action2.gif",
          }
        },
        {
          content: ["Thank you for your help!!!",
            "HokieBird successfully memorized all the dancing steps and has been ready for the dance exam!"],
          image: "/if_condition/thanks.gif"
        },
      ],
  },
  {
    BookId: 7,
    title: "Python Tutor",
    bookCover: "/color_1.png",
    blurb: "Learn programming with a visualizer",
    author: "Dev",
    cover: "/Python-logo-notext.png",
    pages:
      [{
        content: ["Python Tutor is a visualizer that allows you to see how your code is executed step by step.",
          "You can see the values of variables and how they change as your code is executed.",
          "You can also see the call stack and how functions are called and returned.",
          "Let's try it out!"],
        image: "tutor",
        props: {
          code: "def add(a, b):\n\treturn a + b\n\nx = 1\ny = 2\nz = add(x, y)",
        }
      }],
  },
] as Book[]