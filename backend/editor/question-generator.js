const craftQn = (qn, input, output) => {
  return { question: qn, input: input, output: output };
};

const questionBank = {
  easy: [
    craftQn(
      "We’re not going to sugar-coat it: Chicago’s winters can be rough. The temperatures sometimes dip to uncomfortable levels and, after last year’s “polar vortex”, the University of Chicago Weather Service wants to find out exactly how bad the winter was. More specifically, they are interested in knowing the total number of days in which the temperature was below zero degrees Celsius.",
      "The input is composed of two lines. The first line contains a single positive integer 𝑛 (1≤𝑛≤100) that specifies the number of temperatures collected by the University of Chicago Weather Service. The second line contains 𝑛 temperatures, each separated by a single space. Each temperature is represented by an integer 𝑡 (−1000000≤𝑡≤1000000)",
      "You must print a single integer: the number of temperatures strictly less than zero."
    ),
    craftQn(
      "The number 𝑆 is called the mean of two numbers 𝑅1 and 𝑅2 if 𝑆 is equal to (𝑅1+𝑅2)/2. Mirko’s birthday present for Slavko was two integers 𝑅1 and 𝑅2. Slavko promptly calculated their mean which also happened to be an integer but then lost 𝑅2! Help Slavko restore 𝑅2.",
      "The first and only line of input contains two integers 𝑅1 and 𝑆, both between −1000 and 1000.",
      "Output 𝑅2 on a single line."
    )
  ],
  medium: [
    craftQn(
      "Every school morning Mirko is woken up by the sound of his alarm clock. Since he is a bit forgetful, quite often he leaves the alarm on on Saturday morning too. That’s not too bad though, since he feels good when he realizes he doesn’t have to get up from his warm and cozy bed.\
\
He likes that so much that he would like to experience that on other days of the week too! His friend Slavko offered this simple solution: set his alarm clock 45 minutes early, and he can enjoy the comfort of his bed, fully awake, for 45 minutes each day. \
\
Mirko decided to heed his advice, however his alarm clock uses 24-hour notation and he has issues with adjusting the time. Help Mirko and write a program that will take one time stamp, in 24-hour notation, and print out a new time stamp, 45 minutes earlier, also in 24-hour notation.\
\
If you are unfamiliar with 24-hour time notation yourself, you might be interested to know it starts with 0:00 (midnight) and ends with 23:59 (one minute before midnight).",
      "The first and only line of input will contain exactly two integers 𝐻 and 𝑀 (0≤𝐻≤23,0≤𝑀≤59) separated by a single space, the input time in 24-hour notation. 𝐻 denotes hours and 𝑀 minutes.",
      "The first and only line of output should contain exactly two integers, the time 45 minutes before input time."
    ),
    craftQn(
      "Your program will be given an integer X. Find the smallest number larger than X consisting of the same digits as X.",
      "The first line of input contains the integer 𝑋 (1≤𝑋≤999999). The first digit in 𝑋 will not be a zero.",
      "Output the result on a single line. If there is no such number, output 0."
    ),
    craftQn(
      "Given 𝑁 integers in the range [−50000,50000], how many ways are there to pick three integers 𝑎𝑖, 𝑎𝑗, 𝑎𝑘, such that 𝑖, 𝑗, 𝑘 are pairwise distinct and 𝑎𝑖+𝑎𝑗=𝑎𝑘? Two ways are different if their ordered triples (𝑖,𝑗,𝑘) of indices are different.",
      "The first line of input consists of a single integer 𝑁 (1≤𝑁≤200000). The next line consists of 𝑁 space-separated integers 𝑎1,𝑎2,…,𝑎𝑁.",
      "Output an integer representing the number of ways."
    )
  ],
  difficult: [
    craftQn(
      "Given 𝑆, a set of integers, find the largest 𝑑 such that 𝑎+𝑏+𝑐=𝑑 where 𝑎,𝑏,𝑐 and 𝑑 are distinct elements of 𝑆.",
      "The input starts with an integer 1≤𝑁≤4000, the number of elements in 𝑆. It is followed by 𝑁 lines containing the elements of 𝑠, one per line. Each element of 𝑆 is a distinct integer between −536870912 and +536870911, inclusive.",
      "Output a single line containing the maximum 𝑑 as described in the statement. If no such 𝑑 exists, output a single line containing no solution."
    ),
    craftQn(
      "There is a racetrack where 𝑛 players complete laps. Each player has their own maximum speed. In this racetrack, overtaking is only possible near the finish line at every lap: when a player approaches a slower player, she will stay behind him until at the finish line. At the finish line, all players crossing the line at the same time resume driving at their maximum speed (so faster players overtake slower ones). Initially, all players start at the finish line. Given the lap time and the number of laps to complete for each player, calculate the times they complete the race in. ",
      "The first line contains an integer 𝑛 (1≤𝑛≤5000), the number of players. The following 𝑛 lines contain the players’ lap time and number of laps to complete: the 𝑖-th line contains two integers 𝑡𝑖 and 𝑐𝑖 (1≤𝑡𝑖≤106, 1≤𝑐𝑖≤1000), the lap time and the number of laps to complete for player 𝑖. The players are sorted in decreasing order of speed, that is, 𝑡1≤𝑡2≤…≤𝑡𝑛.",
      "Output 𝑛 lines; the 𝑖’th line must contain the time that player 𝑖 completes the race."
    )
  ]
};

function genQuestion(difficulty) {
  const randomIndex = Math.floor(Math.random() * questionBank[difficulty].length);
  return { questionObj: questionBank[difficulty][randomIndex], key: randomIndex };
}

function retrieveQuestion(index, difficulty) {
  return questionBank[difficulty][index];
}

module.exports = {
  genQuestion,
  retrieveQuestion
};
