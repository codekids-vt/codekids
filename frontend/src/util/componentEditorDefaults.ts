import { DragAndDropActivity } from "../components/DragAndDrop";
import { ImageClickAnimation } from "../components/ImageClickAnimation";
import { Styles } from "../components/Question";

export const editorDefaults: { [key: string]: any } = {
  HokieBirdActivity: {
    draggable: true,
    command: "Drag the Colors over these boxes",
    helpImage: "/help/HokieBirdColoring_Help.png",
  },
  tutor: {
    code: 'number = 23\n\ncollege = "Virginia Tech"\n\nsecond_number = number + 10\n\nprint(college)\nprint(second_number)',
  },
  HokieBirdMazeActivity: {
    type: true,
    actions: ["turn_left()", "turn_right()", "move(2)", "move(3)"],
    draggable: false,
    images: ["Maze1.jpg", "Maze2.jpg", "Maze3.jpg", "Maze4.jpg", "Maze5.jpg"],
    pageNum: 5,
    bookID: 2,
    ans: ["move(3)", "turn_right()", "move(2)", "turn_left()", "move(2)"],
    helpImage: "/help/Maze_Help_1.png",
  },
  HokieBirdIfConditionActivity: {
    draggable: true,
    statements: ["tshirt", "winter_jacket"],
    condition: "weather_is_hot",
    ans: ["tshirt"],
    helpImage: "/help/IfConditionBook1_Help_1.png",
    image: "/if_condition/sun.gif",
    ans_image: "/if_condition/HokieBirdSun.gif",
  },
  DataTypesIntro: {},
  IntsAndBools: {
    pageNumber: 2,
    ans: ["Option 4. Make sure to read the explanation!"],
    helpImage: "/help/Variables_Help_3.png",
  },
  VariableAssignment: {
    pageNumber: 1,
    ans: ["Option 1. Make sure to read the explanation!"],
    helpImage: "/help/Variables_Help_1.png",
  },
  Strings: {
    pageNumber: 1,
    ans: ["Option 3. Make sure to read the explanation!"],
    helpImage: "/help/Variables_Help_5.png",
  },
  Sequencing: {
    ans: ["Option 3. Make sure to read the explanation!"],
    helpImage: "/help/Variables_Help_4.png",
  },
  IfStatementIntro: {},
  ConditionalOperators: {
    pageNumber: 1,
    ans: ["Option 2. Make sure to read the explanation!"],
    helpImage: "/help/PythonIf_Help_1.png",
  },
  LogicalOperators: {
    pageNumber: 1,
  },
  IfStatements: {
    pageNumber: 1,
    ans: ["Option 2. Make sure to read the explanation!"],
    helpImage: "/help/PythonIf_Help_8.png",
  },
  LifeOfMoose: {
    pageNumber: 1,
  },
  MooseMilestone: {
    pageNumber: 1,
  },
  MooseDr: {
    pageNumber: 1,
  },
  MooseChallengingYear: {
    pageNumber: 1,
  },
  MooseThankYou: {},
  BuyDonut: {
    ans: [
      "Option 1. Make sure to read the explanation!",
      "Press Next until you reach the end of the code!",
    ],
  },
  BuyMultiple: {
    pageNumber: 2,
    ans: ["Click Next until you reach the end of the code!"],
  },
  MultipleConditions: {
    pageNumber: 2,
    ans: ["Option 3. Make sure to read the explanation!"],
  },
  ChangingCondition: {
    pageNumber: 1,
    ans: ["Option 1. Make sure to read the explanation!"],
  },
  InputActivity: {
    showIOLabels: true,
    options: [1, 2, 3, 4],
    ans: [3],
    initialImage: "/io_book/park_1.png",
    correctImage: "/io_book/park_2.png",
    helpImage: "/help/IO_Help_1.png",
  },
  FoodTruckActivity: {
    showIOLabels: true,
    options: [
      {
        text: "Spinach",
        image: "/io_book/spinach_pizza.png",
      },
      {
        text: "Onions",
        image: "/io_book/diced_onions_pizza.png",
      },
      {
        text: "Bacon",
        image: "/io_book/bacon_pizza.png",
      },
    ],
  },
  InputOutputActivity: {
    showIOLabels: true,
    backgroundImage: "Add background image here",
    categories: [
      {
        name: "Category Name",
        options: [
          {
            text: "Input One",
            image: "Add the first image here",
            style: {
              width: "Add width here (px)",
              height: "Add height here (px)",
            },
            position: {
              top: "Add top position here (%)",
              left: "Add left position here (%)",
            },
          },
          {
            text: "Input Two",
            image: "Add the second image here",
            style: {
              width: "Add width here (px)",
              height: "Add height here (px)",
            },
            position: {
              top: "Add top position here (%)",
              left: "Add left position here (%)",
            },
          },
          {
            text: "Input Three",
            image: "Add the third image here",
            style: {
              width: "Add width here (px)",
              height: "Add height here (px)",
            },
            position: {
              top: "Add top position here (%)",
              left: "Add left position here (%)",
            },
          },
        ],
      },
    ],
  },
  SelectImageActivity: {
    question: "What is the color of the sky?",
    options: [
      {
        text: "Blue",
        image: "/sky.jpg",
      },
      {
        text: "Green",
        image: "/sky.jpg",
      },
      {
        text: "Red",
        image: "/sky.jpg",
      },
    ],
  },
  BinaryConverter: {
    correct: 7,
  },
  Computer_IO: {},
  CostarColoring: {
    type: true,
    command: "Type the Colors over these boxes",
    "": "/help/HokieBirdColoring_Help.png",
  },
  ClothingActivity: {
    showIOLabels: true,
    options: [
      {
        text: "Bow",
        image: "/Co-Star_InputOutputBook/justHeadband.png",
      },
      {
        text: "Glasses",
        image: "/Co-Star_InputOutputBook/justGlasses.png",
      },
    ],
    baseLayer: "/Co-Star_InputOutputBook/baseAvatar.png",
  },
  BookRushHour: {
    initialCars: [
      { x: 0, y: 2, vertical: false, length: 2, color: "bg-red-500" },
      { x: 4, y: 3, vertical: false, length: 2, color: "bg-blue-500" },
      { x: 2, y: 2, vertical: true, length: 2, color: "bg-green-500" },
    ],
    solveToContinue: true,
    exitImage: "Exit",
  },
  ImageQuestion: {
    question: "What is the color of the sky?",
    answers: [
      {
        answerText: "Blue",
        answerExplanation: "The sky is blue!",
        correct: true,
      },
      {
        answerText: "Green",
        answerExplanation: "The sky is not green!",
        correct: false,
      },
      {
        answerText: "Red",
        answerExplanation: "The sky is not red!",
        correct: false,
      },
    ],
    style: Styles.HORIZONTAL,
    image: "/sky.jpg",
    code: "",
  },
  DragMultiChoice: {
    title: "What is the title?",
    options: [
      {
        text: "Option 1",
        image: "https://codekids-minio.endeavour.cs.vt.edu/codekids/1.webp",
      },
      {
        text: "Option 2",
      },
    ],
    questions: [
      {
        text: "What is the color of the sky?",
        answer: "Option 1",
      },
      {
        text: "What is the color of the sky?",
        answer: "Option 2",
      },
    ],
  },
  CodeStepFlowchart: {
    flowChart: {
      "0": {
        text: "Click next and watch the for loop execute.",
        image:
          "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/baby_goats/for_loop_baby_goats.svg",
      },
      "2": {
        text: "The arrow is followed back up to the beginning of the loop.",
        image:
          "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/baby_goats/for_loop_baby_goats_3.svg",
      },
      "3": {
        text: "cup_number is X which is in range(0, 5). So, the True arrow will be followed.",
        image:
          "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/baby_goats/for_loop_baby_goats_2.svg",
      },
      "5": {
        text: "cup_number would become 5 which is not in range(0, 5). So, the False arrow is followed.",
        image:
          "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/baby_goats/for_loop_baby_goats_4.svg",
      },
      "2f": {
        text: "The loop begins and will execute as long as cup_number is in range(0, 5).",
        image:
          "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/baby_goats/for_loop_baby_goats_1.svg",
      },
    },
    code: '# cup_number is currently %N\n \nfor cup_number in range(0, 5):\n\tprint("Fed baby goats a cup!")\n \n#End of program',
    skipLines: [1, 4],
    loop: {
      exists: true,
      lines: [2, 3],
      iterations: 5,
      type: "for",
      display: "iteration",
    },
  },
  FillInTheBlank: {
    image:
      "https://codekids-minio.endeavour.cs.vt.edu/codekids/loops_book/riding_2.jpg",
    description: [
      "Make the For-loop execute 3 times for each lap of pony riding!",
      "Type in the iterator variable and iterator object from the given options!",
      "You can also click an answer choice and a text input to copy it in.",
    ],
    questionText: "for %B in %B:\n\tprint('Fed baby goats one cup!')",
    answers: [
      {
        text: "lap_number",
        correct: "1",
      },
      {
        text: "range(0, 5)",
        correct: "-1",
      },
      {
        text: "range(0, 3)",
        correct: "2",
      },
    ],
    helpText: {
      start: "Type in your answers above and then click submit!",
      correct:
        "Correct! The iterator variable is lap_number and iterator object is range(0, 3).",
      incorrect:
        "Incorrect. Remember a for loop has a iterator variable and a iterable object.",
    },
  },
  TextBoxImage: {
    prompt: "What is the name of your pet?",
    image:
      " https://codekids-minio.endeavour.cs.vt.edu/codekids/PetTrainingBook/dog-clipart-boy-3.png",
  },
  DragAndDrop: {
    dogImage:
      " https://codekids-minio.endeavour.cs.vt.edu/codekids/PetTrainingBook/dog-clipart-boy-3.png",
    treatImage: "/PetTrainingBook/dog_treat.png",
    toyImage: "/PetTrainingBook/dog-toy.png",
    prompt: "Drag and drop a toy or a treat to your pet!",
  },

  ImageClickAnimation: {
    image:
      "https://codekids-minio.endeavour.cs.vt.edu/codekids/PetTrainingBook/dog-clipart-boy-3.png",
    animationType: "freeze",
    wrongTrickMode: false,
  },

  CountdownTimer: {
    dogImage:
      "https://codekids-minio.endeavour.cs.vt.edu/codekids/PetTrainingBook/dog-clipart-boy-3.png",
    initialTime: "00:10",
  },
};
