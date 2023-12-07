import { Book } from "@/util/BookData";

export const books: Book[] = [
  {
    BookId: 1,
    bookCover: "/color_2.png",
    title: "Variables With Coloring",
    blurb: "Learn about different variables types, coloring the Hokie Bird!",
    author: "Dev",
    gradeRange: "K-2",
    pages: [
      {
        content: ["In this book we will discover how to drag and drop different colors into variables",
          "We will also learn how to manually complete variables!",
        ],
        image: "/HokieBird.png",
      },
      {
        content: ["Here you are able to drag and drop the different colors into the eight different parts of the Hokie Bird.",
          "The Hokie Bird is split into eight parts; the head, the neck, the body, the tail, the left leg, the right leg, the left foot and the right foot.",
          "Try dragging different colors and see the changes happen live!",
          "Notice how the value on the right hand side changes when a color is dropped, this is the assignment of a variable."
        ],
        image: "HokieBirdActivity",
        props: {
          draggable: true,
          command: "Drag the Colors over these boxes",
          helpImage: "/help/HokieBirdColoring_Help.png"
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
          helpImage: "/help/HokieBirdColoring_Help.png"
        }
      },
      {
        content: ["now, you know how to set color for each part, you can type body part with corresponding color."
        ],
        image: "HokieBirdActivity",
        props: {
          type: true,
          typeVariable: true,
          command: "Type the Body Part and Colors over these boxes",
          helpImage: "/help/HokieBirdColoring_Help.png"
        }
      },
    ],
  },
  {
    BookId: 2,
    bookCover: "/color_3.png",
    title: "Hokie Bird is Lost!",
    blurb: "Learn how to communicate specific instructions to the Hokie Bird to help him find his way!",
    author: "Dev",
    gradeRange: "2-4",
    pages: [
      {
        content: ["The football game is about to start, and HokieBird is very worried because he is lost and doesn't know how to get to Lane Stadium.",
          "You will drag and drop commands to help HokieBird make it to lane stadium!",
          "Direct the HokieBird across campus with the following commands in blue!"
        ],
        image: "/Maze/SadHokieBird.png",
      },
      {
        content: ["Since we now know how to move the HokieBird around, we need to determine what actions we should do.",
          "This where the commands come in. We know that if there is a square in front of the bird then we can move.",
          "We also know that if the road turns right or left we can make the HokieBird turn in that direction.",
          "The first condition will be move(3). This is used to move the bird forward by 3 squares.",
          "Turning left and right is similar with the move_left() and move_right() commands.",
          "Placing any of these commands in the command boxes will move the HokieBird in order of the commands, if they are valid.",
        ],
        image: "/Maze/SadHokieBird.png",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "Drag the blue commands into the statement boxes!",
          "When you are ready to test, click the Run button."
        ],
        image: "HokieBirdMazeActivity",
        props: {
          draggable: true,
          images: [
            "Maze1.jpg",
            "Maze2.jpg",
            "Maze3.jpg",
            "Maze4.jpg",
            "Maze5.jpg"
          ],
          pageNum: 2,
          bookID: 2,
          ans: [
            "move(3)",
            "turn_right()",
            "move(2)",
            "turn_left()",
            "move(2)"
          ],
          helpImage: "/help/Maze_Help_1.png"
        },
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium!"],
        image: "/Maze/Maze6.jpg",
      },
      {
        content: [
          "Oh no, now the HokieBird is lost somewhere else <need to fill new place with images and map>",
          "this will be non draggable",
        ],
        image: "/Maze/Maze6.jpg",
      },
      {
        content: ["Lets try moving the Hokie Bird forward!",
          "Drag the blue commands into the statement boxes!",
          "When you are ready to test, click the Run button."
        ],
        image: "HokieBirdMazeActivity",
        props: {
          type: true,
          draggable: false,
          images: [
            "Maze1.jpg",
            "Maze2.jpg",
            "Maze3.jpg",
            "Maze4.jpg",
            "Maze5.jpg"
          ],
          pageNum: 5,
          bookID: 2,
          ans: [
            "move(3)",
            "turn_right()",
            "move(2)",
            "turn_left()",
            "move(2)"
          ],
          helpImage: "/help/Maze_Help_1.png"
        },
      },
      {
        content: ["Awesome, the Hokie Bird made it to Lane Stadium!"],
        image: "/Maze/Maze6.jpg",
      },
    ]
  },
  {
    BookId: 3,
    title: "IO Hand In Hand",
    bookCover: "/lighter_orange.png",
    blurb: "Learn about how a computer can compute patterns!",
    author: "Prapti",
    gradeRange: "2-4",
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
        image: "/io_book/intro.png"
      },
      {
        content: [
          "Let's start by trying to count the total number of slides in the park.",
          "How many slides are there in the park?",
        ],
        component: "InputActivity",
        image: "InputActivity",
        props: {
          showIOLabels: true,
          options: [1, 2, 3, 4],
          ans: [3],
          initialImage: "/io_book/park_1.png",
          correctImage: "/io_book/park_2.png",
          helpImage: "/help/IO_Help_1.png"
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
        image: "/io_book/definition.png",
      },
      {
        content: [
          "Hey! Let's hop on to the next activity.",
          "Now, we will play with the flowers in the park."
        ],
        image: "/io_book/next.png",
      },
      {
        content: ["Look at each corner of the park", "How many yellow flowers are there in total in all the corners?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [9, 10, 11, 12],
          ans: [10],
          initialImage: "/io_book/flowers_0.png",
          correctImage: "/io_book/flowers_0.png",
          helpImage: "/help/IO_Help_2.png"
        },
      },
      {
        content: ["How many pink flowers are there combined in all the corners?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [9, 10, 11, 12],
          ans: [9],
          initialImage: "/io_book/flowers_0.png",
          correctImage: "/io_book/flowers_0.png",
          helpImage: "/help/IO_Help_3.png"
        },
      },
      {
        content: ["What is the sum of flowers in all the corners right now?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [19, 20, 21, 22],
          ans: [19],
          initialImage: "/io_book/flowers_0.png",
          correctImage: "/io_book/flowers_0.png",
          helpImage: "/help/IO_Help_4.png"
        },
      },
      {
        content: [
          "Observe the pattern in the sum of yellow and pink flowers in every corner",
          "Now guess the total number of pink flowers that should be planted in the right corner in bottom?"
        ],
        image: "InputActivity",
        game: "TableComponent",
        props: {
          showIOLabels: true,
          options: [4, 5, 6, 7],
          ans: [5],
          initialImage: "/io_book/flowers_1.png",
          correctImage: "/io_book/flowers_2.png",
          cellContents: ['Yellow Flowers', 'Pink Flowers', '1', '2', '2', '3', '3', '4', '4', '?'],
          helpImage: "/help/IO_Help_5.png"
        },
      },
      {
        content: ["Look at each corner of the park", "How many yellow trees are there in total in all the corners?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [7, 8, 9, 10],
          ans: [10],
          initialImage: "/io_book/trees_0.png",
          correctImage: "/io_book/trees_0.png",
          helpImage: "/help/IO_Help_6.png"
        },
      },
      {
        content: ["How many green trees are there combined in all the corners?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [7, 8, 9, 10],
          ans: [9],
          initialImage: "/io_book/trees_0.png",
          correctImage: "/io_book/trees_0.png",
          helpImage: "/help/IO_Help_7.png"
        },
      },
      {
        content: ["What is the sum of trees in all the corners right now?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [16, 17, 18, 19],
          ans: [19],
          initialImage: "/io_book/trees_0.png",
          correctImage: "/io_book/trees_0.png",
          helpImage: "/help/IO_Help_8.png"
        },
      },
      {
        content: [
          "Each corner of the park has certain number of green and yellow trees.",
          "Observe the pattern in the total number of each color tree planted.",
          "Now guess the sum of number of green trees that should be planted in the right corner in bottom? "
        ],
        image: "InputActivity",
        game: "TableComponent",
        props: {
          showIOLabels: true,
          options: [1, 2, 3, 4],
          ans: [1],
          initialImage: "/io_book/trees_1.png",
          correctImage: "/io_book/trees_2.png",
          cellContents: ['Yellow Trees', 'Green Trees', '1', '4', '2', '3', '3', '2', '4', '?'],
          helpImage: "/help/IO_Help_9.png"
        },
      },
      {
        content: ["How many pink flowers are there combined on each side of a single yellow tree?"],
        image: "InputActivity",
        game: "InputActivity",
        props: {
          showIOLabels: true,
          options: [1, 2, 3, 4],
          ans: [2],
          initialImage: "/io_book/multiplication_0.png",
          correctImage: "/io_book/multiplication_0.png",
          helpImage: "/help/IO_Help_10.png"
        },
      },
      {
        content: [
          "Observe the pattern in the total number of pink flowers beside each yellow tree.",
          "Now, guess sum of pink flowers that should be planted if there are four trees together?"
        ],
        image: "InputActivity",
        game: "TableComponent",
        props: {
          showIOLabels: true,
          options: [6, 7, 8, 9],
          ans: [8],
          initialImage: "/io_book/multiplication_1.png",
          correctImage: "/io_book/multiplication_2.png",
          cellContents: ['Yellow Trees', 'Pink Flowers', '1', '2', '2', '4', '3', '6', '4', '?'],
          helpImage: "/help/IO_Help_11.png"
        },
      }
    ]
  },
  {
    BookId: 4,
    bookCover: "/lighter_maroon.png",
    title: "If-condition with HokieBird Weathers",
    blurb: "Learn when and when not a command will run with HokieBird!",
    author: "Dev",
    gradeRange: "2-4",
    pages: [
      {
        content: ["We will use If conditions to help the Hokie bird make it to Lane Stadium",
          "If Conditions have two outcomes, they are either true or false",
          "If a value is true the 'code' that immediatley follows is taken.",
          "If the value is false then the 'code' that follows is ignored.",],
        image: "/if_condition/weather.jpg",
      },
      {
        content: [
          "If-statement diagram is a very common strategy to solve if-condition problems.",
          "You can try the following question with the if-statement diagram on the left.",
          "On the left is a very basic if-statement flow chart, since there is only one condition.",
          "You can learn more about flow charts in the Python flow chart book on the homepage!",
          "Example:",
          "If it is a hot day, then HokieBird need to wear a T-shirt.",
          "If it is a chilly day, then HokieBird need to wear a Winter-jacket.",
        ],
        image: "/if_condition/if-else-1.png",
      },
      {
        content: [
          "You can try the following question with the if-statement diagram on the left as well.",
          "On the left is a slightly more complex if-statement flow chart, as there are multiple conditions.",
          "You can learn more about flow charts in the Python flow chart book on the homepage!",
          "Example:",
          "If it is a hot day, then HokieBird need to wear a T-shirt.",
          "else if it is a chilly day, then HokieBird need to wear a Winter-jacket.",
          "else the weather is not too cold or hot, Hokie Bird can wear a sweatshirt."
        ],
        image: "/if_condition/if-else-2.png",
      },
      {
        content: ["Lets start with dragging and drop statements that should happen if the condition is true!",
          "This means that whatever the if condition, what is inside the '()', is true the statement will happen!",
          "Here the HokieBird is outside and the temperature is around 70 degrees, not too cold, not too hot, lets dress him!",
          "When you're done move onto the next page with the next button."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["tshirt", "winter_jacket"],
          condition: "weather_is_hot",
          ans: ["tshirt"],
          helpImage: "/help/IfConditionBook1_Help_1.png",
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
          effect: "/if_condition/snow.gif",
          helpImage: "/help/IfConditionBook1_Help_2.png"
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
          effect: "/if_condition/rain.gif",
          helpImage: "/help/IfConditionBook1_Help_3.png"
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
          effect: "/if_condition/rain.gif",
          helpImage: "/help/IfConditionBook1_Help_4.png"
        },
      },
    ]
  },
  {
    BookId: 5,
    title: "If-condition with HokieBird Mood",
    bookCover: "/color_7.png",
    blurb: "Learn when and when not a command will run with HokieBird!",
    author: "Dev",
    gradeRange: "2-4",
    pages: [
      {
        content: ["We all make different facial expressions based on different emotions.",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "/if_condition/mood.gif",
      },
      {
        content: ["We all make different facial expressions based on different emotions.",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_sad",
          ans: ["cry"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/sad.png",
          helpImage: "/help/IfConditionBook2_Help_1.png"
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions.",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_happy",
          ans: ["laugh"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/happy.png",
          helpImage: "/help/IfConditionBook2_Help_2.png"
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions.",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_angry",
          ans: ["angry"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/angry.png",
          helpImage: "/help/IfConditionBook2_Help_3.png"
        },
      },
      {
        content: ["We all make different facial expressions based on different emotions.",
          "Let's use if-condition to find the facial expressions that correspond to the different emotions of HokieBird."],
        image: "HokieBirdIfConditionActivity",
        props: {
          draggable: true,
          statements: ["cry", "laugh", "surprised", "angry"],
          condition: "Hokie_feels_surprised",
          ans: ["surprised"],
          image: "/if_condition/mood.gif",
          ans_image: "/if_condition/surprise.png",
          helpImage: "/help/IfConditionBook2_Help_4.png"
        },
      },
    ]
  },
  {
    BookId: 6,
    title: "If-condition with HokieBird Dance",
    bookCover: "/color_4.png",
    blurb: "Help the Hokie Bird Dance!",
    author: "Dev",
    cover: "/if_condition/HokieBirdIf.png",
    gradeRange: "4-6",
    pages:
      [
        {
          content: ["HokieBird took an introductory dance technique class this semester,",
            "using the outdoor space to improve his fitness.",
            "But there's a dance exam coming up and HokieBird needs to go and memorize the order of all the dance steps.",
            " Let's help HokieBird! Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers."],
          image: "/if_condition/dance.jpg",
        },
        {
          content: ["Let's assist him in repeatedly practicing the moves!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)."],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action1",
            ans: ["bend_sideways"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action1.gif",
            helpImage: "/help/IfConditionBook3_Help_1.png"
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)."],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action4",
            ans: ["wave_arm"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action4.gif",
            helpImage: "/help/IfConditionBook3_Help_2.png"
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)."],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action3",
            ans: ["butt_twist"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action3.gif",
            helpImage: "/help/IfConditionBook3_Help_3.png"
          }
        },
        {
          content: ["Nice work! Let's help him memorize another move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)."],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action5",
            ans: ["rotate"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action5.gif",
            helpImage: "/help/IfConditionBook3_Help_4.png"
          }
        },
        {
          content: ["Nice work! Let's help him memorize the final move!",
            "Based on the action numbers you said, HokieBird should make the dance steps that correspond to the numbers.",
            "The appropriate dance steps are:",
            "action1 (bend sideways)", "action2 (back kick)", "action3 (butt twist)", "action4 (wave arm)", "action5 (rotate)."],
          image: "HokieBirdIfConditionActivity",
          props: {
            draggable: true,
            statements: ["bend_sideways", "back_kick", "butt_twist", "wave_arm", "rotate"],
            condition: "HokieBird_makes_action2",
            ans: ["back_kick"],
            image: "/if_condition/ready.gif",
            ans_image: "/if_condition/action2.gif",
            helpImage: "/help/IfConditionBook3_Help_5.png"
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
    title: "Variables",
    bookCover: "/lighter_orange.png",
    blurb: "Learn about variables in Python",
    author: "Dev",
    cover: "/Python-logo-notext.png",
    gradeRange: "4-6",
    pages:
      [{
        content: ["Python Tutor is a visualizer that allows you to see how your code is executed step by step.",
          "We'll be using this throughout several books as you learn about programming in Python!",
          "You can see the values of variables and how they change as your code is executed.",
          "Just prest the Next button and the visualizer and watch as the variables are created and printed.",
          "Let's try it out!"],
        image: "tutor",
        props: {
          code: "number = 23\n\ncollege = \"Virginia Tech\"\n\nsecond_number = number + 10\n\nprint(college)\nprint(second_number)",
        }
      },
      { // Variables intro
        image: "/VariablesBook/variables_intro.png",
        content: ["Variables are places where you can store data.",
          "You can think about a variable as a 'Box' with a name.",
          "Suppose we name a box therapy_dog, then this 'box' can store data related to therapy dog.",
          "Lets use Epcot as an example. Epcot is Virginia Tech's newest therapy dog!",
          "The variable's name is therapy_dog, and the data will be 'Epcot'.",
          "In Python, you can't have spaces in variable names. We use underscores instead like in therapy_dog."]
      },
      { // Variables intro 2
        image: "/VariablesBook/variables_intro2.png",
        content: ["When you see a variable in code, the name of the variable will always be to the left of the '=' sign.",
          "Everything to the right of the '=' sign is what you are setting as the variables value.",
          "The box is to the left of the '=' and what you want to put in the box is to the right of the '='",
          "For this example, the code would by therapy_dog='Epcot'"]
      },
      { // Variables intro in python tutor
        content: ["Here is an example of how variables would be assigned in Python.",
          "Note: print() will be used a lot throughout this book. All print() does is print the value in it's parenthesis.",
          "Click the Next button in Python Tutor to see the variable be created.",
          "You'll see a gray box be created that has the variable names and their values (similar to our box analogy!)."],
        image: "tutor",
        props: {
          code: "# therapy_dog is the name of the variable (left of '=' sign)\n# and 'Epcot' is the value of the variable (right of '=' sign)\n" +
            "therapy_dog = 'Epcot'\nprint(therapy_dog)\n\n" +
            "# year is the name of the variable (left of '=' sign)\n# and 2023 is the value of the variable (right of '=' sign).\nyear = 2023\nprint(year)"
        }
      },
      { // Variable Assignment
        image: "VariableAssignment",
        content: ["Variables can be assigned different values throughout a program.",
          "When a variable that already has a value is assigned a new value, the old value is lost.",
          "Think of your age as a variable. If you are 8 years old now, on your birthday your old age will be lost and your new age will be 9!",
          "Try out the examples and exercises."],
        props: {
          pageNumber: 1,
          ans: ["Option 1. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_1.png"
        }
      },
      { // Variable Assignment
        image: "VariableAssignment",
        content: ["We can also use a variable's old value to assign itself a new value.",
          "In this example, we are reassigning anniversary to be it's old value plus 1.",
          "Read through the code and answer the question!"],
        props: {
          pageNumber: 2,
          ans: ["Option 1. Make sure to read the explanation!"]
        }
      },
      {
        image: "tutor",
        content: ["Remember that when a variable that already stores a value is reassigned, the old value is lost.",
          "Run through the code to the left to see this!",
          "number is created on line two and assigned the value 10. It is the reassigned on line 6."],
        props: {
          code: "# Here, number is initially assigned to 10\nnumber = 10\nprint(number)\n\n# Here, number is reassigned to 20\nnumber = 20\n\n" +
            "# Since number was reassigned, the first value of 10 is lost\n# and number is now 20\nprint(number)"
        }
      },
      {
        image: "tutor",
        content: ["Here is another example of variable assignment.",
          "Walk through the program and notice how first is reassigned to the value of second.",
          "What do you think will be printed at the end of the program?"],
        props: {
          code: "first = 100\nsecond = 1\n\n# Here, first is reassigned to the value of second.\nfirst = second\n\n# What do think will be printed?\nprint(first)"
        }
      },
      { // Data types intro
        image: "DataTypesIntro",
        content: ["When assigning a variable a value, it's also important to consider what type of value you are assigning.",
          "This is known as a data type. We'll only use 3 data types for now.",
          "1. Integer - this is any whole number like 9.",
          "2. String - this is text like \"Hello\".",
          "3. Boolean - this is a logical value indicating True or False.",
          "We will look closer at these data types in the following pages."]
      },
      { // Ints and Bools Intro
        image: "IntsAndBools",
        content: ["This page will focus on Integers and Booleans.",
          "Integer - this is any whole number like 9.",
          "Boolean - this is a logical value indicating True or False.",
          "For example, 2 < 4 has a Boolean value of True since 2 is less than 4."],
        props: {
          pageNumber: 1,
          ans: ["Option 2. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_2.png"
        }
      },
      { // Ints and Bools Intro
        image: "IntsAndBools",
        content: ["This page will focus on Integers and Booleans.",
          "Integer - this is any whole number like 9.",
          "Boolean - this is a logical value indicating True or False.",
          "For example, 2 < 4 has a Boolean value of True since 2 is less than 4."],
        props: {
          pageNumber: 2,
          ans: ["Option 4. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_3.png"
        }
      },
      { // Ints and Bools Intro Python Tutor
        image: "tutor",
        content: ["Take a look at the variables to the left.",
          "The variable num is assigned the whole number 9, which means it's a Integer.",
          "The variable sky_is_blue is assigned True, which means it's a Boolean."],
        props: {
          code: "# Here num is an Integer\nnum = 9\n\n# Here sky_is_blue is a Boolean\nsky_is_blue  = True"
        }
      },
      {
        image: "Sequencing",
        content: ["Let's use the football game for another question!",
          "A very important concept to understand while programming is that each line is executed from top to bottom.",
          "This means every line's execution is dependent on the lines above it.",
          "Think of each line as it's own step with the very beginning line being step 1.",
          "Each step will be executed one after another until the program is over."],
        props: {
          ans: ["Option 3. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_4.png"
        }
      },
      {
        image: "tutor",
        content: ["Click through the code to the left and think about how the code is executed from top to bottom.",
          "Even though first is reassigned to 5 and second is reassigned to 10, total was calculated before hand."],
        props: {
          code: "first = 0\nsecond = 0\n\n#What is total set to here?\ntotal = first + second\n\n#first and second are reassigned after total has been assigned.\nfirst = 5\nsecond = 10\n\n" +
            "# total is still printed as 0.\nprint(total)"
        }
      },
      { // Strings
        image: "Strings",
        props: {
          pageNumber: 1,
          ans: ["Option 3. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_5.png"
        },
        content: ["This page will focus on Strings!",
          "You may have noticed in the previous pages that 'Epcot' is an example of a String! Let's try more practice.",
          "A String is text like \"Hello\". You can also think of it like a sequence of different characters.",
          "When the data type is String, then the characters will ALWAYS be surrounded by double or single quotation marks.",
          "For example, \"Hello\" and \'Hello\' are both strings since they're surrounded by double or single quotation marks.",
          "What do you think '9' is? You may initially think Integer, but notice it's surrounded in single quotation marks. So, it's a string."],
      },
      { // Strings
        image: "Strings",
        props: {
          pageNumber: 2,
          ans: ["Option 4. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_6.png"
        },
        content: ["When a String is printed, the quotation marks are not included.",
          "So, print(\"Hello\") will print Hello."]
      },
      {
        image: "Strings",
        props: {
          pageNumber: 3,
          ans: ["Option 3. Make sure to read the explanation!", "Option 2. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_7.png"
        },
        content: ["Try out these exercises on Strings.",
          "Remember that anything that's in single or double quotation marks are Strings.",
          "Also, notice in the code we have two variables called anniversary and anniversary_2.",
          "These are two separate variables, but since they hold similar data, they have been given similar names."]
      },
      {
        image: "Strings",
        props: {
          pageNumber: 4,
          ans: ["Option 2. Make sure to read the explanation!"],
          helpImage: "/help/Variables_Help_8.png"
        },
        content: ["Take a moment to think about his question.",
          "Pay close attention to what's in the print at the end.",
          "Remember that anything surrounded by single or double quotation marks are Strings."]
      },
      {
        image: "tutor",
        content: ["Look that the code to the left.",
          "Pay close attention to what is actually in the print statement.",
          "What will be printed at the end of the program?",
          "At first, you may think it will be 151 since that is the value of virginia_tech_age.",
          "However, notice that what is actually inside the print statement is the String \"virginia_tech_age\".",
          "So, the String value \"virginia_tech_age\" is actually in the print statement, not the variable virginia_tech_age."],
        props: {
          code: "virginia_tech_age = 151\n\n# Pay close attention to what's in the print statement.\n# Is it actually the variable virginia_tech_age?\nprint(\"virginia_tech_age\")"
        }
      },
      {
        image: "/if_condition/action5.gif",
        content: ["Congratulations! You have completed this book about variables!",
          "Here is a quick recap of what we learned.",
          "Variables are places where you store data throughout a program.",
          "Every variable has a name and can be assigned a value. When a variable is assigned a value, any old value it had is lost.",
          "The values of a variable are always of a data type: Integer, Boolean, or String.",
          "An Integer is a whole number.",
          "A Boolean is alway True or False.",
          "A String is any data surrounded about single or double quotation marks."]
      }
      ],
  },
  {
    BookId: 8,
    title: "If Statements",
    blurb: "Learn about Python If Statements",
    author: "Dev",
    bookCover: "/color_4.png",
    cover: "/Python-logo-notext.png",
    gradeRange: "4-6",
    pages:
      [
        { // If statement intro
          image: "IfStatementIntro",
          content: ["In programs, there are ways for you to control the flow of execution.",
            "In this book you'll learn about If statements in Python!",
            "If-statements simply allow you to execute code only if a certain condition is true."]
        },
        {
          image: "tutor",
          content: ["Look at this quick example of an If-Statement!",
            "Click the Next button in Python Tutor and run through the code.",
            "Notice how lines 6 and 7 are skipped but the rest of the program executes.",
            "This is because on line 3 we are saying \"If sky_is_blue is True, then execute lines 4 and 5. Otherwise, execute line 7\".",
            "Line 9 isn't part of the If-statement, so it get's executed regardless."],
          props: {
            code: 'sky_is_blue = True\n\nif sky_is_blue:\n\tprint("It\'s sunny today!")\n\tprint("Lets play outside!")\nelse:\n\tprint("It\'s raining. Lets stay inside")\n\nprint("Hopefully it\'s sunny tomorrow!")'
          }
        },
        {
          image: "tutor",
          content: ["Here is the same code as the previous page except this time sky_is_blue is False",
            "Now notice lines 4 and 5 get skipped and line 7 is executed.",
            "Line 7 is part of the 'else'. The 'else' part of an If-statement get's executed when the If-statement is false.",
            "In this example, sky_is_blue is False. So the 'else' part is executed.",
            "If-statements let you choose what to execute.",
            "This is how you can control the flow of execution!"],
          props: {
            code: 'sky_is_blue = False\n\nif sky_is_blue:\n\tprint("It\'s sunny today!")\n\tprint("Lets play outside!")\nelse:\n\tprint("It\'s raining. Lets stay inside")\n\nprint("Hopefully it\'s sunny tomorrow!")'
          }
        },
        {
          image: "tutor",
          content: ["It's also important to recognize what is part of an If-statement.",
            "Python uses indentation to convey this.",
            "Notice that lines 4 and 5 are indented under the If-statement on line 3.",
            "This means they are part of the If-statement and will be executed if sky_is_blue is True",
            "Also notice line 7 is NOT indented, so it's not part of the If-Statement and will be executed regardless.",
            "Run through the code to see this!",
            "As a quick exercise, click the Edit Code button and change sky_is_blue to True and run it again!"],
          props: {
            code: 'sky_is_blue = False\n\nif sky_is_blue:\n\tprint("It\'s sunny today!")\n\tprint("Lets play outside!")\n\nprint("Hopefully it\'s sunny tomorrow!")'
          }
        },
        { // Conditional operators
          image: "ConditionalOperators",
          content: ["Let's learn a very important concept for if-statements: Conditional Operators.",
            "A conditional operator is similar to a mathematical operator(+, -). However, a conditional operator's result is always True or False -- a Boolean!",
            "Remember we learned about Booleans in the previous book about variables.",
            "Here are some common conditional operators:",
            "1. Use \"==\" to check if two values are equal or the same.",
            "2. Use \"<\" to check if one value is less than another.",
            "3. use \">\" to check of one value is greater than another.",
            "Here are some examples:",
            "5 == 5 will be True",
            "5 + 5 == 10 will be True",
            "5 < 5 will be False"],
          props: {
            pageNumber: 1,
            ans: ["Option 2. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_1.png"
          }
        },
        { // Conditional operators
          image: "ConditionalOperators",
          content: ["Here is another question using the '==' operator.",
            "Remember '==' checks is two values are equal."],
          props: {
            pageNumber: 2,
            ans: ["Option 1. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_2.png"
          }
        },
        { // Conditional operators
          image: "ConditionalOperators",
          content: ["It's also important to pay attention to the data types of the values you are comparing.",
            "It's best to never use conditional operators on variables with different data types.",
            "Technically, == can be used on different data types and it will always return false.",
            "However, using the conditional operators > and < will cause an error."],
          props: {
            pageNumber: 3,
            ans: ["Option 2. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_3.png"
          }
        },
        { // Conditional operators
          image: "ConditionalOperators",
          content: ["Remember that x < y will evaluate to True if x is less than y.",
            "So, 5 < 10 will evaluate to True.",
            "However, if the values being compared aren't the same data type, there will be an error."],
          props: {
            pageNumber: 4,
            ans: ["Option 3. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_4.png"
          }
        },
        {
          image: "tutor",
          content: ["Here is an example using '==' to check if two values are equal.",
            "Run through the code and pay attention to what gets printed on lines 5 and 6.",
            "derek_color is NOT equal to wager_color so False is printed.",
            "derek_color is equal to josie_color so True is Printed."],
          props: {
            code: "derek_color = 'cream'\nwagner_color = 'black'\njosie_color = 'cream'\n\nprint(derek_color == wagner_color)\nprint(derek_color == josie_color)"
          }
        },
        {
          image: "tutor",
          content: ["Take a look at this example.",
            "Notice how we are now combining conditional operators and If-statements.",
            "Since conditional operators always evaluate to True or False, they are perfect for using in If-statements.",
            "Run through this code and notice what happens at line 5.",
            "black_number < cream_number will evaluate to True, so line 6 will be executed.",
            "Now pay close attention to the variable data types on line 8. Notice that total_number is a String.",
            "Since total_number is a String, the expression will evaluate to False."],
          props: {
            code: "black_number = 1\ncream_number = 2\ntotal_number = '3'\n\nif black_number < cream_number:\n\tprint('1 is less than 2')\n\nprint(total_number == (black_number + cream_number))"
          }
        },
        { // Logical operators
          image: "LogicalOperators",
          content: ["Another kind of operator are logical operators.",
            "Logical operators help us make decisions based on multiple Booleans.",
            "Here are the logical operators we'll use.",
            "1. and operator. All Booleans must be true.",
            "2. or operator. At least one Boolean is true, the rest can be false.",
            "2. not operator. True becomes false, and false becomes true.",
            "Take a look at the examples!"],
          props: {
            pageNumber: 1
          }
        },
        { // Logical operators AND operator
          image: "LogicalOperators",
          content: ["For the and operator, all values must be True.",
            "Simply ask \"are all of these True\"?",
            "True and True = True. True and False = False",
            "2 < 5 and 3 < 5 = True",
            "5 == 4 and 5 == 5 = False"],
          props: {
            pageNumber: 2,
            ans: ["Option 1. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_5.png"
          }
        },
        { // Logical operators OR operator
          image: "LogicalOperators",
          content: ["For the or operator, at least one value must be True.",
            "Simply ask \"is at least one of these True\"?",
            "True or True = True. True or False = True. False or False = False",
            "2 < 5 or 3 < 5 = True",
            "5 == 4 or 5 == 5 = True",
            "5 == 4 or 5 == 6 = False"],
          props: {
            pageNumber: 3,
            ans: ["Option 1. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_6.png"
          }
        },
        { // Logical operators OR operator
          image: "LogicalOperators",
          content: ["For the not operator, it's the opposite.",
            "Simply ask \"what is the opposite\"?",
            "not True = False. not False = True",
            "not (2 < 5) = True",
            "not (5 == 5) = False",
            "not (5 == 5 and 2 < 5) = False"],
          props: {
            pageNumber: 4,
            ans: ["Option 2. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_7.png"
          }
        },
        {
          image: "tutor",
          content: ["Run through the code to see logical operators in action!",
            "Lines 4 and 5 are using 'and'. Notice that only line 4 prints True and line 5 prints False. This is because for 'and', both values must be True.",
            "Line 7-9 are using 'or'. Notice that lines 7 and 8 print True while line 9 prints False. This is because only one value needs to be True.",
            "Lastly, lines 11 and 12 are using 'not'. Line 11 prints False because the opposite of True is False. Line 12 prints True because the opposite of False is True."],
          props: {
            code: "true = True\nfalse = False\n\nprint(true and true)\nprint(true and false)\n\nprint(true or true)\nprint(true or false)\nprint(false or false)\n\nprint(not true)\nprint(not false)"
          }
        },
        {
          image: "tutor",
          content: ["Run through the code to see logical operators in action and pay attention to what each variable is assigned!",
            "On line 5, both derek_color and josie_color are 'cream', so using 'and' will evaluate to True.",
            "On line 7, derek_color is cream but wagner_color is NOT cream. However, it is using 'or' so it will evaluate to True.",
            "On line 9, derek_color is cream and we are using 'not'. So, it will evaluate to False."],
          props: {
            code: "derek_color = 'cream'\nwagner_color = 'black'\njosie_color = 'cream'\n\nderek_and_josie = (derek_color == 'cream') and (josie_color == 'cream')\n\n" +
              "derek_and_wagner = (derek_color == 'cream') or (wagner_color == 'cream')\n\nderek_opposite = not(derek_color == 'cream')"
          }
        },
        {
          image: "IfStatements",
          content: ["Now that we know about conditional and logical operators, let's see how they can be used in If-statements.",
            "As we have seen, if statements allow you to control the flow of execution based on a condition.",
            "A condition can only ever be True or False.",
            "This means Booleans, conditional operators, and logical operators can be used to create a condition for an If-statement.",
            "When the condition is True, everything that is under the if statement and indented will be executed.",
            "On this page, the indents will be highlighted yellow so you can easily see what is part of the If-statement.",
            "Also, remember the 'else' will be executed if the If-statement fails.",
            "The 'else' isn't required but is helpful when you want to execute code when the If-statement fails."],
          props: {
            pageNumber: 1,
            ans: ["Option 2. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_8.png"
          }
        },
        {
          image: "IfStatements",
          content: ["Try the If-statement exercise to the left!",
            "Pay close attention to what is actually part of the If-statement and else.",
            "Anything that is not part of the If-statement or else will executed normally."],
          props: {
            pageNumber: 2,
            ans: ["Option 2. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_9.png"
          }
        },
        {
          image: "IfStatements",
          content: ["The yellow highlight has been removed from the If-statements, so it's up to you now to notice the indents!",
            "Try out the exercise to the left!"],
          props: {
            pageNumber: 3,
            ans: ["Option 3. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_10.png"
          }
        },
        {
          image: "IfStatements",
          content: ["Remember that we can use conditional and logical operators in If-statements.",
            "Try out the exercises to the left!"],
          props: {
            pageNumber: 4,
            ans: ["Option 3. Make sure to read the explanation!"],
            helpImage: "/help/PythonIf_Help_11.png"
          }
        },
        {
          image: "tutor",
          content: ["Here is an example of a Python program with multiple If-statements.",
            "Notice how the first If-statement is skipped because x is not equal to 2",
            "It then proceeds to execute the rest of the program."],
          props: {
            code: "x = 1\nif x == 2:\n\tprint(\"x is 2!\")\n\n# Notice the program continues to execute even though the If-statement above failed.\n"
              + "print(\"x is not 2!\")\n\nif x == 1:\n\tprint(\"x is 1!\")"
          },
        },
        {
          image: "/if_condition/action5.gif",
          content: ["Congratulations! You now know how If-statements work in Python!",
            "Lets do a quick recap of what we learned!",
            "Conditional operators are used to compare values and always returns a Boolean (True or False).",
            "The conditional operators we learned about are ++, >, and <.",
            "Logical operators are used to make a decision based on multiple Booleans.",
            "The logical operators we learned about are AND, OR, and NOT.",
            "Conditional and logical operators can be used with If-statements to control how a program executes.",
            "In the next book, we'll learn how you can further control how a program executes by using loops!"]
        }
      ]
  },
  {
    BookId: 9,
    title: "Life of Moose",
    blurb: "Learn coding through the life of Moose",
    author: "Dev",
    bookCover: "/color_8.png",
    cover: "/LifeOfMoose/moose_milestone.png",
    gradeRange: "4-6",
    pages:
      [
        {
          image: "/LifeOfMoose/life_of_moose_intro.png",
          content: ["This is a picture of Moose, who was Virginia Tech's first therapy dog and a remarkable being.",
            "Moose was born in New York and trained to be a guide dog for the blind and eventually became a therapy dog.",
            "In October 2013, this intelligent Labrador Retriever joined forces the Trent Davis who is an animal-assisted therapy consultant.",
            "Moose began providing valuable services to the university and surrounding community. Bringing comfort and support to many."]
        },
        {
          image: "LifeOfMoose",
          content: ["Moose's breed is 'Labrador Retriever' and his fur has a cream color.",
            "He was born on February 13, 2012.",
            "Lets use Python Tutor on the left to print out Moose's birthday, breed, and color!"],
          props: {
            pageNumber: 1
          }
        },
        {
          image: "LifeOfMoose",
          content: [],
          props: {
            pageNumber: 2
          }
        },
        {
          image: "MooseMilestone",
          content: ["By 2019, Moose had done something amazing!",
            "He had helped people in 5,000 meetings and spent lots of time making others happy!",
            "He had become a beloved dog at Virginia Tech and the community.",
            "Lets figure out how old Moose was when he reached this amazing milestone using Python."],
          props: {
            pageNumber: 1
          }
        },
        {
          image: "MooseMilestone",
          content: [],
          props: {
            pageNumber: 2
          }
        },
        {
          image: "MooseDr",
          content: ["In 2020, Moose got a very special award.",
            "He was awarded with an honorary Doctor of Veterinary Medicine for being such a good boy!",
            "unfortunately, that same year, Moose was also diagnosed with"],
          props: {
            pageNumber: 1
          }
        },
        {
          image: "MooseDr",
          content: [],
          props: {
            pageNumber: 2
          }
        },
        {
          image: "MooseChallengingYear",
          content: ["Unfortunately, in 2020 Moose was diagnosed with cancer.",
            "The nurses and doctors at Blacksburg Veterinary Teaching Hospital and the Animal Care center took good care him during this time.",
            "On December 2, 2020, Moose passed away peacefully.",
            "Lets use Python to figure out how old Moose was and how many years he helped our community."],
          props: {
            pageNumber: 1
          }
        },
        {
          image: "MooseChallengingYear",
          content: [],
          props: {
            pageNumber: 2
          }
        },
        {
          image: "MooseThankYou",
          content: ["Moose was the first superhero therapy dog at Virginia Tech.",
            "Therapy dogs and their teams are very important because they help people who going through difficult times.",
            "Sometimes they even go as far as saving someones life!",
            "Let's say thank you to Moose and all of the other therapy dogs for helping our community!",
            "Click the Edit Code button to fill out the code template then run though your code!"]
        }
      ]
  }
] as Book[]