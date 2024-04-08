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
};
