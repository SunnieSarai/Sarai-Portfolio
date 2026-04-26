const phrases = {
  A: 'Welcome, weary traveler. What is thy name?',
  B1: 'A most noble name indeed, fit for a hero.',
  B2: 'A nameless wanderer? The realm shall not remember thee.',
  C: 'A jest, of course. Every brave soul must embark upon a quest. Dare ye proceed?',
  D1: 'Ah, the spirit of adventure lives within thee. Let us proceed!',
  R1: 'Before We embark on our quest, you must solve a riddle to prove thy worth.',
  R2: 'I have towns but no people. Rivers but no water and mountains but no trees. What am I?',
  R3: 'You have failed to demonstrate wit, Return from whence you came!',
  D2: 'Courage gave chase, yet thou fled. Mayhaps another day.',
  E: 'Rejoice! you bare wit, but do the Gods of fate have you in their grasps? Thou standeth at a crossroads. Wilt thou take the path of Light, or venture into the Dark?',
  F1: 'Thou hast chosen wisely, brave soul.',
  F2: "The coward's path leadeth not to glory.",
  L0: "Thy heart hath spurned the sword's call wisdom and mercy guide thy steps. The path of peace is thine, and heaven smiles upon it.",
  L1: "By the roadside, a wounded child weeps. you try your hand at maintaining the child's heartbeat.",
  L2a: 'Rejoice, brave soul! The child yet breathes! The Lord of these lands bids thee to feast in his hall, where thy deeds shall be sung and thy cup overflow!',
  L2b: 'See what thy failure hath wrought this innocent lies cold, drained of life! Banishment is thy sentence... unless thou wouldst prove thy worth anew?',
  L2c: 'You made a valiant effort to help the child, but they died.',
  Dk1: "The stench of an ogre assaults thy senses far fouler than Shrek's swamp! What say thee? Stand and smite, or live to fight another day?(click ok to fight, and cancel to run)",
  Dk2a: 'By steel and spirit, thou hast fought most gallantly! The Crown itself bids thee take thy place among his noble court—welcome home, brave warrior!',
  Dk2b: "Thou has tried but Thou art vanquished! No true hero falters thus... yet redemption's path remains. Dost thou dare tread it?",
  G: 'Through dark and endless nights, thy journey ends behold the castle! Hail thee, victorious!',
  ER: 'Wouldst thou dare to try again, valiant one?',
  Pr1: 'Thou happeneth upon an ominous skull on thy journey. Wilt thou choose to USE this relic or cast it aside and IGNORE?',
  Pr2: 'Thou placest the skull upon a shattered altar and art whisked away to the Dark Path! May the Gods of mercy guide thee...',
  Pr3: "Thou continuest thy journey pondering what fate mayhap awaited thee beyond the veil of curiosity",
  Pra: 'Thou happenst upon a withered witch, beckoning thee with a trembling hand. Dost thou choose to TRUST her or LEAVE her to her solitude?',
  Prb: "Thou didst choose trust a noble deed indeed! For such virtue, the light path now lies before thee, and thou art spared the clash of an Ogre's wrath!",
  Prc: "Thou didst choose to leave the witch where she stood. Now... we shall see where such a choice doth lead thee.",
  Prd: "I couldn't grasp thy meaning. Speak thy words anew (USE or IGNORE)",
  Pre: "I  couldn't grasp thy meaning , speak thy words anew (TRUST or LEAVE)",
};

// Start of game
function beginQuest() {
  // Ask for player's name
  const name = prompt(phrases.A);
  // Check if left blank or canceled
  if (!name) {
    // If so, ask player to try again
    alert(phrases.B2);
    const tryAgain = confirm(phrases.ER);
    // If yes, restart game with beginQuest()
    if (tryAgain) {
      beginQuest();
    }
    // If no, end game
    return;
  }

  // Greet player with their name
  alert(`${name}, ${phrases.B1}`);
  // Ask player if they want to begin quest
  const start = confirm(phrases.C);

  // If yes, go to crossroads
  if (start) {
    alert(phrases.D1);
    alert(phrases.R1);
    const riddle = prompt(phrases.R2);
    if (
      riddle &&
      (riddle.toLowerCase() === 'map' || riddle.toLowerCase() === 'a map')
    ) {
      choosePath();
    } else {
      alert(phrases.R3);
      beginQuest();
    }
    // If no, insult them
  } else {
    alert(phrases.D2);
  }
}
// Make a choice at the crossroads
function choosePath() {
  // Choose between light or dark
  const path = prompt(phrases.E);
  // Check if left blank or canceled
  if (!path) {
    alert(phrases.F2);
    return;
  }
  alert(phrases.F1);
  if (path.toLowerCase() === 'light') {
    lightPath(); // Trigger a light function
  } else if (path.toLowerCase() === 'dark') {
    darkPath();
  } else {
    const retry = confirm(phrases.ER);
    if (retry) {
      choosePath();
    }
    return;
  }
}

function lightPath() {
  // trigger a new function placementRiddle
  const placementRiddle = prompt(phrases.Pr1);
  // if (typeof(placementRiddle) === null) {
  //   alert(phrases.Prd);
  //   lightPath();
  //   return;
  // }
  if (placementRiddle.toUpperCase() === 'USE') {
    alert(phrases.Pr2);
    darkPath();
    return;
  } else if (placementRiddle.toUpperCase() === 'IGNORE') {
    alert(phrases.Pr3);
  } else {
    alert(phrases.Prd);
    lightPath();
  }
  const helpChild = confirm(phrases.L1);
  if (helpChild) {
    const score = Math.random(); //some cases returns undefined before flowing to the proper chanel
    if (score <= 0.5) {
      alert(phrases.L2c);
      const redeem = confirm(phrases.L2b);
      if (redeem) {
        beginQuest();
      }
    } else {
      alert(phrases.L2a);
      alert(phrases.G);
    }
  } else {
    const redeem = confirm(phrases.L2b);
    if (redeem) {
      beginQuest();
    }
  }
}

function darkPath() {
  const riddle2 = prompt(phrases.Pra);

  if (riddle2.toUpperCase() === 'TRUST') {
    alert(phrases.Prb);
    lightPath();
    return;
  } else if (riddle2.toUpperCase() === 'LEAVE') {
    alert(phrases.Prc);
  } else {
    alert(phrases.Pre);
    darkPath();
  }

  const fightOgre = confirm(phrases.Dk1);
  if (fightOgre) {
    const score = Math.random();
    if (score >= 0.5) {
      alert(phrases.Dk2a);
      alert(phrases.G);
    } else {
      const try2 = confirm(phrases.Dk2b);
      if (try2) {
        beginQuest();
      }
    }
  } else {
    alert(phrases.D2);
    const try2 = confirm(phrases.Dk2b);
    if (try2) {
      beginQuest();
    }
  }
}

beginQuest();
