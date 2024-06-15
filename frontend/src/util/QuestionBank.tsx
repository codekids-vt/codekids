/*
    File containing the all of Questions for Misconception books
*/

import { IAnswer } from "../components/Question";

export interface IQuestion {
  question: string;
  answers: IAnswer[];
}

// Template for each question
/*
    "": {
        question: "",
        answers: []
    }
*/

/*===============================================
Variables Book
===============================================*/
export const VariablesQuestions: { [id: string]: IQuestion } = {
  VariableAssignmentQ1: {
    question: "What is printed when this program runs?",
    answers: [
      {
        answerText: "147\nA year has passed!\n148",
        answerExplanation:
          "Correct! anniversary is originally 147 and is then changed to 148.",
        correct: true,
      },
      {
        answerText: "147\nA year has passed!\n147",
        answerExplanation:
          "Incorrect. Remember the old value of a variable is lost when it's assigned a new value. Try again!",
        correct: false,
      },
      {
        answerText: "147\nA year has passed!\n295",
        answerExplanation:
          "Incorrect. Assigning a variable a new value DOES NOT add it with the old value. The variable is simply assigned the new value. Try again!",
        correct: false,
      },
    ],
  },
  VariableAssignmentQ2: {
    question: "What is printed when this program runs?",
    answers: [
      {
        answerText: "147\nA year has passed!\n148",
        answerExplanation:
          "Correct! anniversary is reassigned to its previous value + 1 which is 148.",
        correct: true,
      },
      {
        answerText: "147\nA year has passed!\nanniversary + 1",
        answerExplanation:
          "Incorrect. anniversary is being set to it's previous value + 1 (anniversary + 1). Not the expression itself.",
        correct: false,
      },
      {
        answerText: "147\nA year has passed!\n147",
        answerExplanation:
          "Incorrect. Notice that anniversary is being reassigned after a year has passed to anniversary + 1",
        correct: false,
      },
    ],
  },
  IntsAndBoolsQ1: {
    question: "What is the correct integer value for hokies_score?",
    answers: [
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. False is a Boolean, not an Integer. Try again!",
        correct: false,
      },
      {
        answerText: "38",
        answerExplanation:
          "Correct! The Hokies scored 38 points which is an Integer!",
        correct: true,
      },
      {
        answerText: "10",
        answerExplanation:
          "Incorrect. 10 is an Integer. However, it's not the score of the Hokies. Try Again!",
        correct: false,
      },
      {
        answerText: "'38'",
        answerExplanation:
          "Incorrect. '38' is a string since it's surrounded by single quotations. Try again!",
        correct: false,
      },
    ],
  },
  IntsAndBoolsQ2: {
    question: "What is the variable 'win' evaluated to?",
    answers: [
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. Is hokies_score greater than syracuse_score? Try again!",
        correct: false,
      },
      {
        answerText: "22",
        answerExplanation:
          "Incorrect. Remember 22 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.",
        correct: false,
      },
      {
        answerText: "10",
        answerExplanation:
          "Incorrect. Remember 10 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.",
        correct: false,
      },
      {
        answerText: "True",
        answerExplanation:
          "Correct! hokies_score is greater than syracuse_score so win is True!",
        correct: true,
      },
    ],
  },
  SequencingQ1: {
    question: "What is printed when print(different) is called at the end?",
    answers: [
      {
        answerText: "15",
        answerExplanation:
          "Incorrect. It is not 15. Read the code from top to bottom. What is different assigned to? Try again!",
        correct: false,
      },
      {
        answerText: "0",
        answerExplanation:
          "Incorrect. It is not 0. Read the code from top to bottom. What is different assigned to? Try again!",
        correct: false,
      },
      {
        answerText: "28",
        answerExplanation:
          "Correct! different is assigned before hokies_score and syracuse_score were reassigned. So different is assigned 28.",
        correct: true,
      },
      {
        answerText: "1",
        answerExplanation:
          "Incorrect. Read the code from top to bottom. Notice different is assigned before hokies_score is reassigned to 23 and syracuse_score is reassigned to 22. What is different assigned to? Try again!",
        correct: false,
      },
    ],
  },
  StringsQ1: {
    question: "What is the data type of the variable's values?",
    answers: [
      {
        answerText: "Integer",
        answerExplanation:
          "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember an integer is a whole number. Try again!",
        correct: false,
      },
      {
        answerText: "Boolean",
        answerExplanation:
          "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember a Boolean is always True or False. Try again!",
        correct: false,
      },
      {
        answerText: "String",
        answerExplanation:
          "Correct! All the values are surrounded by single or double quotation marks. This means they are Strings!",
        correct: true,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also it's impossible for a variable to not have a data type. Try again!",
        correct: false,
      },
    ],
  },
  StringsQ2: {
    question: "What is printed at the end of this program?",
    answers: [
      {
        answerText: '"Derek"',
        answerExplanation:
          "Incorrect. Remember the quotation marks are not printed when a String is printed. Try again!",
        correct: false,
      },
      {
        answerText: "therapy_dog_left",
        answerExplanation:
          "Incorrect. therapy_dog_left is a variable. The print statement will print the value of the variable.",
        correct: false,
      },
      {
        answerText: "Josie",
        answerExplanation:
          "Incorrect. therapy_dog_left is what's being printed. Try Again!",
        correct: false,
      },
      {
        answerText: "Derek",
        answerExplanation:
          "Correct! The quotation marks are not printed when printing a String.",
        correct: true,
      },
    ],
  },
  StringsQ3: {
    question: "What is the data type of anniversary?",
    answers: [
      {
        answerText: "Boolean",
        answerExplanation:
          "Incorrect. Remember a Boolean can only be True or False. Try again!",
        correct: false,
      },
      {
        answerText: "String",
        answerExplanation:
          "Incorrect. Remember a string is always surrounded by single or double quotation marks. Try again!",
        correct: false,
      },
      {
        answerText: "Integer",
        answerExplanation:
          "Correct! anniversary is assigned 147 which is an integer.",
        correct: true,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. It's impossible for a variable to not have a data type. Try again!",
        correct: false,
      },
    ],
  },
  StringsQ4: {
    question: "What is the data type of anniversary_2?",
    answers: [
      {
        answerText: "Boolean",
        answerExplanation:
          "Incorrect. Remember a Boolean can only be True or False. Try again!",
        correct: false,
      },
      {
        answerText: "String",
        answerExplanation:
          "Correct! Even though 148 is a number, it's surrounded by double quotation marks. So, it's a String!",
        correct: true,
      },
      {
        answerText: "Integer",
        answerExplanation:
          "Incorrect. 148 is a number, however, notice that it's surrounded by double quotation marks. Try again!",
        correct: false,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. It's impossible for a variable to not have a data type. Try again!",
        correct: false,
      },
    ],
  },
  StringsQ5: {
    question: "What is printed during this program?",
    answers: [
      {
        answerText: "A year has passed!\n148",
        answerExplanation:
          "Incorrect. Pay close attention to what's in the final print statement. Try again!",
        correct: false,
      },
      {
        answerText: "A year has passed!\nanniversary_2",
        answerExplanation:
          "Correct! In the last print statement, it prints 'anniversary_2' which is a string. Not the variable anniversary_2",
        correct: true,
      },
      {
        answerText: 'A year has passed!\n"148"',
        answerExplanation:
          "Incorrect. Pay close attention to what's in the final print statement and remember printing a string doesn't include the quotation marks. Try again!",
        correct: false,
      },
    ],
  },
};

/*===============================================
If-Statements Book
===============================================*/

export const IfStatementsQuestions: { [id: string]: IQuestion } = {
  ConditionalOperatorsQ1: {
    question: "What does derek_color == wagner_color evaluate to?",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Incorrect. Are the values of derek_color and wagner_color equal? Try again!",
        correct: false,
      },
      {
        answerText: "False",
        answerExplanation: "Correct! 'black' is not equal to 'cream'.",
        correct: true,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. Remember the result of == is alway True or False. Try again!",
        correct: false,
      },
    ],
  },
  ConditionalOperatorsQ2: {
    question: "What does derek_color == josie_color evaluate to?",
    answers: [
      {
        answerText: "True",
        answerExplanation: "Correct! 'cream' is equal to 'cream'!",
        correct: true,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. Are the values of derek_color and josie_color equal? Try again!",
        correct: false,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. Remember the result of == is alway True or False. Try again!",
        correct: false,
      },
    ],
  },
  ConditionalOperatorsQ3: {
    question:
      "What does total_number == (black_number + cream_number) evaluate to?",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Incorrect. Notice that total_number is a string. Try again!",
        correct: false,
      },
      {
        answerText: "False",
        answerExplanation:
          "Correct! total_number is a string while black_number and yellow_number are Integers. So it will be false.",
        correct: true,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. Remember the result of == is alway True or False. Try again!",
        correct: false,
      },
    ],
  },
  ConditionalOperatorsQ4: {
    question: "What does total_number > cream_number evaluate to?",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Incorrect. What are the data types of total_number and cream_number? Try again!",
        correct: false,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. What are the data types of total_number and cream_number? Try again!",
        correct: false,
      },
      {
        answerText: "None",
        answerExplanation:
          "Correct! This is using > one a string and integer which can't be done.",
        correct: true,
      },
    ],
  },
  ConditionalOperatorsQ5: {
    question: "What does total_number > cream_number evaluate to?",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Correct! total_number is greater than cream_number.",
        correct: true,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. Is total_number greater than cream_number? Try again!",
        correct: false,
      },
      {
        answerText: "None",
        answerExplanation:
          "Incorrect. Both total_number and cream_number are integer's. So it will be True or False. Try again!",
        correct: false,
      },
    ],
  },
  LogicalOperatorsQ1: {
    question: "",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Correct! derek_color is equal to cream and josie_color is equal to cream.",
        correct: true,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. Is derek_color equal to cream and josie_color equal to cream? Try again!",
        correct: false,
      },
    ],
  },
  LogicalOperatorsQ2: {
    question: "",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Correct! Because derek_color is equal to cream, it doesn't matter that wagner_color is not equal to cream. OR only cares that one of them is True.",
        correct: true,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. Remember OR gives True as long as at least one of the Booleans is True. Are either of the Booleans true? Try again!",
        correct: false,
      },
    ],
  },
  LogicalOperatorsQ3: {
    question: "",
    answers: [
      {
        answerText: "True",
        answerExplanation:
          "Incorrect. derek_color is equal to 'cream', which means derek_color == 'cream' is True, but we want to get the NOT of that. Try again!",
        correct: false,
      },
      {
        answerText: "False",
        answerExplanation:
          "Correct! derek_color is equal to 'cream', which means derek_color == 'cream' is True, so the NOT of that is False",
        correct: true,
      },
    ],
  },
  IfStatementsQ1: {
    question: "",
    answers: [
      {
        answerText: "True\nFalse",
        answerExplanation:
          "Incorrect. Remember that the else isn't executed when the If-statement is True. Try again!",
        correct: false,
      },
      {
        answerText: "True",
        answerExplanation:
          "Correct! derek_is_happy is True so everything indented under the If-statement will be executed and the else will be skipped.",
        correct: true,
      },
      {
        answerText: "False",
        answerExplanation:
          "Incorrect. When the condition for the If-Statement is True, everything indented under the If-statement will be executed. Try again!",
        correct: false,
      },
      {
        answerText: "Nothing will\nbe printed.",
        answerExplanation:
          "Incorrect. If the condition of the If-statement is True, everything indented under the If-statement will be executed. If the condition is false, the else will be executed. Try again!",
        correct: false,
      },
    ],
  },
  IfStatementsQ2: {
    question: "",
    answers: [
      {
        answerText:
          "Wow, it's a beautiful day!\nLet's enjoy the rest of the game!\nHopefully it's sunny tomorrow!",
        answerExplanation:
          "Incorrect. Is the condition in the If-statement True? Try again!",
        correct: false,
      },
      {
        answerText:
          "Gosh, it looks like a rainstorm!\nWe have to cancel the game.\nHopefully it's sunny tomorrow!",
        answerExplanation:
          "Correct! The If-statement will execute. Also, the final print is not part of either the if-statement or else, so it is also printed.",
        correct: true,
      },
      {
        answerText:
          "Gosh, it looks like a rainstorm!\nWe have to cancel the game.\n",
        answerExplanation:
          "Incorrect. Pay attention to the final print. Is it part of either the If-statement or else? Try again!",
        correct: false,
      },
      {
        answerText:
          "Wow, it's a beautiful day!\nLet's enjoy the rest of the game!",
        answerExplanation:
          "Incorrect. Is the condition in the If-statement True? Also is the final print part of the If-statement or else? Try again!",
        correct: false,
      },
    ],
  },
  IfStatementsQ3: {
    question: "",
    answers: [
      {
        answerText: "True\nFalse",
        answerExplanation:
          "Incorrect. Is the condition in the If-statement true? Try again!",
        correct: false,
      },
      {
        answerText: "True",
        answerExplanation:
          "Incorrect. Is the condition in the If-statement true? Also the program will continue to execute after an If-statement. Try again!",
        correct: false,
      },
      {
        answerText: "False",
        answerExplanation:
          'Correct! The condition in the If-statement is false, so the If-statement will be skipped and the program will continue and print "False".',
        correct: true,
      },
      {
        answerText: "Nothing will be printed.",
        answerExplanation:
          "Incorrect. A program will continue to execute even if a If-statement's condition is False. Also, the final print is not indented, so it's not part of the If-statement. Try again!",
        correct: false,
      },
    ],
  },
  IfStatementsQ4: {
    question: "",
    answers: [
      {
        answerText: "Let's celebrate!",
        answerExplanation:
          "Incorrect. Notice the OR logical operator is being used in the If-Statement. So, if either of the conditions are True the whole statement is True. Try again!",
        correct: false,
      },
      {
        answerText: "The Hokie Bird is happy!",
        answerExplanation:
          "Incorrect. Remember that the program continues to execute after an If-statement. Try again!",
        correct: false,
      },
      {
        answerText: "The Hokie Bird is happy!\nLet's celebrate!",
        answerExplanation:
          "Correct! hokie_bird_is_happy is True so the If-statement will pass since the OR logical operator was used.",
        correct: true,
      },
      {
        answerText: "Nothing will be printed.",
        answerExplanation:
          "Incorrect. Notice the OR logical operator is being used in the If-statement. Also the final print is not part of the If-statement. Try again!",
        correct: false,
      },
    ],
  },
};

/*===============================================
Flowchart Book
===============================================*/
export const FlowchartQuestions: { [id: string]: IQuestion } = {
  BuyDonutQ1: {
    question: "What will be printed based on the flowchart?",
    answers: [
      {
        answerText: "Yes, you can buy a donut!",
        answerExplanation:
          "Correct! You have enough money to buy a donut, so it will follow the True arrow. Press the Next button above!",
        correct: true,
      },
      {
        answerText: "Sorry, you don't have enough money to buy a yummy donut.",
        answerExplanation:
          "Incorrect. Do you have enough money to buy a donut? Follow the True or False arrow.",
        correct: false,
      },
    ],
  },
  BuyMultipleQ1: {
    question: "What is the final result that the flowchart above will print?",
    answers: [
      {
        answerText:
          "Yes, you can buy spaghetti pasta, a burger, and an ice-cream!",
        answerExplanation:
          "Incorrect. Is the total cost of the food less than or equal to our money? Try again!",
        correct: false,
      },
      {
        answerText:
          "Sorry, you don't have enough money to buy pasta, a burger, and an ice-cream.",
        answerExplanation:
          "Correct! total will be 11 which is not less than or equal to 9. So we will follow the False arrow.",
        correct: true,
      },
    ],
  },
  MultipleConditionsQ1: {
    question: "What is the final result that the flowchart will print?",
    answers: [
      {
        answerText: "Great! You can buy a pepperoni pizza!",
        answerExplanation:
          "Incorrect. Do you have enough money to buy a pizza? If not, follow the False arrow. Try again!",
        correct: false,
      },
      {
        answerText:
          "Great! You have enough money to buy a healthy green salad!",
        answerExplanation:
          "Incorrect. Do you have enough money to buy a salad? If not, follow the False arrow. Try again!",
        correct: false,
      },
      {
        answerText: "Great! You can buy a delicious bacon & beef burger!",
        answerExplanation:
          "Correct! Following the arrows, you eventually get to the third condition where you compare your money to the burger price. You are able to buy a burger!",
        correct: true,
      },
      {
        answerText:
          "Sadly, you don't have enough money to buy, whether it's pepperoni pizza or a green salad or a burger.",
        answerExplanation:
          "Incorrect. Did you have enough money to buy a burger? If so, follow the True arrow. Try again!",
        correct: false,
      },
    ],
  },
  ChangingConditionQ1: {
    question: "What is the final result that the flowchart above will print.",
    answers: [
      {
        answerText:
          "Yes, you have enough money to buy a peperoni pizza!\nYes, you have rest money to buy a strawberry cake and a donut!",
        answerExplanation:
          "Correct! We had enough money to buy the pizza, cake, and donut!",
        correct: true,
      },
      {
        answerText:
          "Yes, you have enough money to buy a peperoni pizza!\nSorry, there's not enough money left for a strawberry shortcake and a donut.",
        answerExplanation:
          "Incorrect. Do we have enough money to buy the pizza, cake, and a donut? Try again!",
        correct: false,
      },
    ],
  },
};

/*===============================================
Life of Moose Book
===============================================*/
export const LifeOfMooseQuestions: { [id: string]: IQuestion } = {
  LifeOfMooseQ1: {
    question:
      'Press the next button once and notice moose_name is created and contains the value "Moose". What will be printed?',
    answers: [
      {
        answerText: "Moose",
        answerExplanation:
          "Correct! Press the next button again to see the value printed!",
        correct: true,
      },
      {
        answerText: "moose_name",
        answerExplanation:
          "Incorrect. Remember that moose_name is variable which has a value. print() will print out that value.",
        correct: false,
      },
    ],
  },
  LifeOfMooseQ2: {
    question:
      'Press the next button again and notice moose_birthday is created and contains the value "02/13/2012". What will be printed',
    answers: [
      {
        answerText: "02/13/2012",
        answerExplanation:
          "Correct! Press the next button again to see the value printed!",
        correct: true,
      },
      {
        answerText: "Moose",
        answerExplanation:
          "Incorrect. Notice the variable being printed next is moose_birthday.",
        correct: false,
      },
    ],
  },
  LifeOfMooseQ3: {
    question:
      "Press the next button again and notice moose_color is created and contains the value 'cream'. What will be printed?",
    answers: [
      {
        answerText: "'cream'",
        answerExplanation:
          "Incorrect. Remember the quotation marks aren't included when printing a String",
        correct: false,
      },
      {
        answerText: "cream",
        answerExplanation:
          "Correct! Press the next button again to see the value printed!",
        correct: true,
      },
    ],
  },
  LifeOfMooseQ4: {
    question:
      "Press the next button again and notice moose_breed is created and contains the value 'Labrador Retriever' What will be printed?",
    answers: [
      {
        answerText: "Labrador Retriever",
        answerExplanation:
          "Correct! Press the next button again to see the value printed!",
        correct: true,
      },
      {
        answerText: "moose_breed",
        answerExplanation:
          "Incorrect. Remember that moose_breed is variable which has a value. print() will print out that value.",
        correct: false,
      },
    ],
  },
  MooseMilestoneQ1: {
    question:
      "What is the data type of the moose_birth and milestone_year variables",
    answers: [
      {
        answerText: "String",
        answerExplanation:
          "Incorrect. Remember that Strings are always surrounded by single or double quotation marks. Try again!",
        correct: false,
      },
      {
        answerText: "Integer",
        answerExplanation:
          "Correct! moose_birth and milestone_year are both Integers",
        correct: true,
      },
      {
        answerText: "Boolean",
        answerExplanation:
          "Incorrect. Remember that a Boolean can only be True or False. Try again!",
        correct: false,
      },
    ],
  },
  MooseMilestoneQ2: {
    question:
      "Press the next button twice and watch moose_birth and milestone_year be created. What will moose_age be assigned to when it's created.",
    answers: [
      {
        answerText: "milestone_year - moose_birth",
        answerExplanation:
          "Incorrect. The program is evaluating (milestone-year - moose-birth) and setting that as the value of moose_age.",
        correct: false,
      },
      {
        answerText: "7",
        answerExplanation:
          "Correct! Press the next button again to see the variable get created!",
        correct: true,
      },
    ],
  },
  MooseMilestoneQ3: {
    question: "What will be printed at the end of the program?",
    answers: [
      {
        answerText: "milestone_year - moose_birth",
        answerExplanation:
          "Incorrect. Remember moose_age is being set to what (milestone_year - moose_birth) evaluates to. Try again!",
        correct: false,
      },
      {
        answerText: "7",
        answerExplanation:
          "Correct! Press the next button again to see the value printed!",
        correct: true,
      },
      {
        answerText: "moose_age",
        answerExplanation:
          "Incorrect. Remember that print(moose_age) will print the value of moose_age. Try again!",
        correct: false,
      },
    ],
  },
  MooseMilestoneQ4: {
    question:
      'What if print(moose_age) was changed to print("moose_age")? What would be printed then? You can also make the change if you press the "Edit Code" button!',
    answers: [
      {
        answerText: "milestone_year - moose_birth",
        answerExplanation:
          "Incorrect. Pay close attention to what's inside the final print(). Try again!",
        correct: false,
      },
      {
        answerText: "7",
        answerExplanation:
          'Incorrect. Notice that print("moose_age") is surrounded by double quotation marks. Try again!',
        correct: false,
      },
      {
        answerText: "moose_age",
        answerExplanation:
          'Correct! print("moose_age") will print the literal string "moose_age", not the variable!',
        correct: true,
      },
    ],
  },
  MooseDrQ1: {
    question:
      "Press the next button until the red arrow is on line 4. What will year be reassigned to?",
    answers: [
      {
        answerText: "4039",
        answerExplanation:
          "Incorrect. Remember that when a variable is reassigned, it loses it's old value. Click next again and watch as year is changed to 2020.",
        correct: false,
      },
      {
        answerText: "2020",
        answerExplanation:
          "Correct! year is reassigned to 2020 and loses it's old value 2019. Click next again and watch as year is changed to 2020.",
        correct: true,
      },
    ],
  },
  MooseDrQ2: {
    question:
      "With the red arrow on line 5, what will moose_title be reassigned to?",
    answers: [
      {
        answerText: "'Dr.'",
        answerExplanation:
          "Correct! moose_title is reassigned to the String 'Dr.'",
        correct: true,
      },
      {
        answerText: "'Mr.Dr.'",
        answerExplanation:
          "Incorrect. Remember that when a variable is reassigned, it loses it's old value. Click next again and watch as moose_title is changed to 'Dr.'",
        correct: false,
      },
    ],
  },
  MooseDrQ3: {
    question: "What will be printed when line 6 is executed?",
    answers: [
      {
        answerText: "2019",
        answerExplanation:
          "Incorrect. What is year assigned to at this point in the program? Hint: Look at the Global frame section. Try again!",
        correct: false,
      },
      {
        answerText: "4039",
        answerExplanation:
          "Incorrect. Remember year was reassigned before and lost it's old value. Hint: Look at the Global frame section. Try again!",
        correct: false,
      },
      {
        answerText: "2020",
        answerExplanation:
          "Correct! year contains the value 2020. Click the Next button to see it print!",
        correct: true,
      },
    ],
  },
  MooseDrQ4: {
    question: "What will be printed when line 7 is executed?",
    answers: [
      {
        answerText: "Dr.",
        answerExplanation:
          "Correct! moose_title contains the value 'Dr.'. Click the next button to see it print!",
        correct: true,
      },
      {
        answerText: "Mr.",
        answerExplanation:
          "Incorrect. What is moose_title assigned to at this point in the program? Hint: Look at the Global frame section. Try again!",
        correct: false,
      },
      {
        answerText: "moose_title",
        answerExplanation:
          "Incorrect. Remember that print() will print the value of a variable. Try again!",
        correct: false,
      },
    ],
  },
  MooseChallengingYearQ1: {
    question:
      "Click the next button twice until the red arrow is on line 3. What will moose_age be assigned to?",
    answers: [
      {
        answerText: "8",
        answerExplanation:
          "Correct! moose_age is assigned to (passed_away - moose_birth). Click the next button.",
        correct: true,
      },
      {
        answerText: "passed_away - moose_birth",
        answerExplanation:
          "Incorrect. moose_age will be assigned to what (passed_away - moose_birth) evaluates to. Click next to see this!",
        correct: false,
      },
    ],
  },
  MooseChallengingYearQ2: {
    question: "What will be printed when line 4 is executed?",
    answers: [
      {
        answerText: "8",
        answerExplanation:
          "Correct. Moose was 8 years old when he passed away.",
        correct: true,
      },
      {
        answerText: "passed_away - moose_birth",
        answerExplanation:
          "Incorrect. moose_age will be assigned to what (passed_away - moose_birth) evaluates to.",
        correct: false,
      },
    ],
  },
  MooseChallengingYearQ3: {
    question:
      "Click next until the red arrow is on line 6. What will years_worked be evaluated to?",
    answers: [
      {
        answerText: "8",
        answerExplanation:
          "Incorrect. years_worked will be assigned to what (passed_away - moose_started) evaluates to.",
        correct: false,
      },
      {
        answerText: "6",
        answerExplanation:
          "Correct. years_worked is assigned to (passed_away - moose_started). Click the next button.",
        correct: true,
      },
    ],
  },
  MooseChallengingYearQ4: {
    question: "What will be printed when line 7 is executed?",
    answers: [
      {
        answerText: "years_worked",
        answerExplanation:
          "Incorrect. Remember print() will print the value of a variable.",
        correct: false,
      },
      {
        answerText: "6",
        answerExplanation:
          "Correct. Moose worked as a therapy dog for 6 years.",
        correct: true,
      },
    ],
  },
};
