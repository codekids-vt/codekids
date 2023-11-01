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
          bookID: 3,
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
        }
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
          bookID: 3,
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
        }
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
        image: "/Maze/Maze14.png",
      },
    ]
  },
  {
    BookId: 4,
    title: "IO Hand In Hand",
    blurb: "Learn about how a computer can compute patterns!",
    author: "Prapti",
    pages: [
      {
        content: ["Come to Hand-in-Hand Park in Blacksburg, Virginia.",
          "You'll find swings to play on, make new friends, and enjoy the shade of big trees.",
          "It's a fun and friendly place for everyone.",
          "Take a break from the hustle and bustle and unwind in this peaceful oasis."],
        image: "/io_book/park.png",
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
          answer: 3,
        }
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
          "Observe the pattern in the number of each color flower planted."
        ],
        image: "/io_book/def.png",
      },
      {
        content: [
          "In every row there are certain number of yellow and pink flowers planted.",
          "Now guess the number of pink flowers that should be planted in the last row?"
        ],
        game: "TableCompletionActivity",
        image: "/io_book/flowers_1.png",
        props: { image: "/io_book/flowers_1.png" },
      },
      {
        content: [
          "Each corner of the park has certain number of green and yellow trees.  Observe the pattern in the number of each color tree planted.",
          "Now guess the number green trees that should be planted in the right corner in bottom? "
        ],
        game: "TableCompletionActivityTrees",
        image: "/io_book/trees_1.png",
        props: { image: "/io_book/trees_1.png" },
      }
    ]
  },
  {
    BookId: 5,
    title: "If-condition with HokieBird Weathers",
    blurb: "Learn when and when not a command will run with HokieBird!",
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
          ans_image: "/if_condition/HokieBirdSun.gif"
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
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/Umbrella2.png",
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
          image: "/if_condition/HokieBirdIf.png",
          ans_image: "/if_condition/HokieBirdSad.jpg",
          effect: "/if_condition/rain.gif"
        }
      },
    ]
  },
  {
    BookId: 6,
    title: "If-conditon with HokieBird Mood",
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
          condition: "Hokie_feels_happy",
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
          condition: "Hokie_feels_angry",
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
          condition: "Hokie_feels_surprised",
          ans: "surprised",
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/surprise.png",
        }
      },
    ]
  },
  {
    BookId: 7,
    title: "If-condition with HokieBird Dance",
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
          image: "/if_condition/dance.png",
        },
        {
          content: ["Let's assist him in repeatedly practicing the moves!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
          "The appropriate dance steps are:",
          "action1(bend sideways), action2(back kick), action3(butt twist),action4(wave arm), action5(rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action1",
            ans: "bend_sideways",
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action1.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
          "The appropriate dance steps are:",
          "action1(bend sideways), action2(back kick), action3(butt twist),action4(wave arm), action5(rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action4",
            ans: "wave_arm",
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action4.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
          "The appropriate dance steps are:",
          "action1(bend sideways), action2(back kick), action3(butt twist),action4(wave arm), action5(rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action3",
            ans: "butt_twist",
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action3.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
          "The appropriate dance steps are:",
          "action1(bend sideways), action2(back kick), action3(butt twist),action4(wave arm), action5(rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action5",
            ans: "rotate",
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action5.gif",
          }
        },
        {
          content: ["Nice work! Let's help him memorize the final move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
          "The appropriate dance steps are:",
          "action1(bend sideways), action2(back kick), action3(butt twist),action4(wave arm), action5(rotate)"],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action2",
            ans: "back_kick",
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
    BookId: 8,
    title: "Python Tutor",
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