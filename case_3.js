let testCase = "()((";

function checkPair () {
  let FrontPair = 0;
  for (let i in testCase) {
    if (testCase[i] === '(') FrontPair++;
    else FrontPair--
  }
  if (FrontPair === 0) console.log("All character is paired!");
  else console.log("Error!", FrontPair, "character is not paired!");
}

checkPair(testCase);