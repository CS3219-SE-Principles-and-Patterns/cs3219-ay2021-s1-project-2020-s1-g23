const craftQn = (qn, input, output) => {
  return { question: qn, input: input, output: output };
};

const questionBank = [
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
];

module.exports = function getQuestion() {
  const randomIndex = Math.floor(Math.random() * questionBank.length);
  return questionBank[randomIndex];
};
