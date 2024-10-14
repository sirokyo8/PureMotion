const assistantContent = document.querySelector('.assistantContent');
// const assistantMediaPlayer = document.querySelector('.assistantMediaPlayer');
const assistant = document.querySelector('.assistant');
const assistantInteraction = document.getElementById('assistantInteraction');
const assistantBeginBtns = document.querySelectorAll('.assistantBegin');
let recognition = new window.webkitSpeechRecognition();
recognition.lang = 'cs-CZ';
let verbsData, pronounsData, responsesData, quotesData;


function loadData(urls) {
  const promises = urls.map(url => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Chyba při načítání dat');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Chyba při načítání dat:', error);
      });
  });
  return Promise.all(promises);
}

document.addEventListener('DOMContentLoaded', () => {
  const urls = [
    '../../data/verbs.json',
    '../../data/pronouns.json',
    '../../data/responses.json',
    '../../data/quotes.json'
  ];

  loadData(urls)
    .then(data => {
      [verbsData, pronounsData, responsesData, quotesData] = data;
    })
    .catch(error => {
      console.error('Chyba při načítání dat:', error);
    });
});




function findVerb(word) {
  const foundVerb = verbsData.verbs.find(verbData => {
    const forms = Object.values(verbData.forms).flat();

    if (verbData.verb === word) {
      return true;
    } else if (verbData.infinitive === word) {
      return true;
    } else if (forms.includes(word)) {
      return true;
    } else {
      return false;
    }
  });

  if (foundVerb) {
    if (foundVerb.verb === word) {
      return { verbType: "command" };
    } else if (foundVerb.infinitive === word) {
      return { verbType: "infinitive" };
    } else {
      return { verbType: "other" };
    }
  } else {
    return null;
  }
}

function findPronoun(word) {
  if (pronounsData.pronouns.personal.includes(word)) {
    return { pronounType: "personal" };
  } else if (pronounsData.pronouns.questions.includes(word)) {
    return { pronounType: "question" };
  } else if (pronounsData.pronouns.demonstrative.includes(word)) {
    return { pronounType: "demonstrative" };
  } else {
    return null;
  }
}


function parseSentence(input) {
  const words = input.split(" ");
  const parsedWords = words.map(word => {

    const foundVerb = findVerb(word);
    const foundPronoun = findPronoun(word);

    if (foundVerb) {
      const { time, verbType } = foundVerb;
      return { word: word, type: "verb", verbType: verbType };
    } else if (foundPronoun) {
      const { pronounType } = foundPronoun;
      return { word: word, type: "pronoun", pronounType: pronounType };
    } else {
      return { word: word, type: "other" };
    }
  });
  return parsedWords;
}

const sentencePatterns = [
  // {
  //   pattern: ['verb', 'other'],
  //   type: "statement"
  // },
  // {
  //   pattern: ['pronoun', 'verb'],
  //   type: "statement"
  // },
  // {
  //   pattern: ['other', 'verb'],
  //   type: "statement"
  // },
  // {
  //   pattern: ['pronoun', 'verb'],
  //   type: "question"
  // },
];

function getSentenceType(parsedSentence) {
  let sentenceType = "unknown";

  if (parsedSentence.some(word => word.type === "verb" && word.verbType === "command")) {
    return {
      words: parsedSentence,
      sentenceType: "command"
    };
  } else {
    for (const pattern of sentencePatterns) {
      const matches = pattern.pattern.every((type, index) => {
        return parsedSentence[index] && parsedSentence[index].type === type;
      });
      if (matches) {
        sentenceType = pattern.type;
        break;
      }
    }
  }

  return {
    words: parsedSentence,
    sentenceType: sentenceType
  };
}

function getRandomResponse(input) {
  const random = Math.floor(Math.random() * input.length);
  return input[random];
}

function botResponse(message) {
  message = message.toLowerCase()
  const parsedSentence = parseSentence(message);
  const parsedSentenceWithType = getSentenceType(parsedSentence)
  console.log(parsedSentence)
  console.log(parsedSentenceWithType)
  let actionResponse;
  let response;

  if (parsedSentenceWithType.sentenceType === "command") {
    actionResponse = handleCommand(parsedSentence)
    response = `${getRandomResponse(responsesData.responses.commands) + " " + actionResponse}`
  } else if (parsedSentenceWithType.sentenceType === "question") {
    actionResponse = handleQuestion(parsedSentence)
    response = `${getRandomResponse(responsesData.responses.questions) + " " + actionResponse}`
  } else if (parsedSentenceWithType.sentenceType === "statement") {
    actionResponse = handleStatement(parsedSentence)
    response = `${getRandomResponse(responsesData.responses.assertions) + " " + actionResponse}`
  } else {
    actionResponse = handleOther(parsedSentence)
    response = `${actionResponse}`
  }

  console.log(response)
  speak(response)
}









recognition.onresult = (event) => {
  const message = event.results[0][0].transcript;
  display(message);
  botResponse(message);
};

function speak(text) {
  const voiceName = "Zuzana";
  const utterance = new SpeechSynthesisUtterance(text);

  function startSpeaking() {
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === voiceName);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    } else {
      console.error("Vybraný hlas nenalezen.");
    }
  }

  if (speechSynthesis.getVoices().length > 0) {
    startSpeaking();
  } else {
    speechSynthesis.onvoiceschanged = startSpeaking;
  }

  utterance.onend = () => {
    recognition.start();
  };
}

function display(text) {
  assistantInteraction.textContent = text;
}

assistantBeginBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (verbsData !== undefined || nounsData !== undefined || pronounsData !== undefined) {
      display("Zdravím! S čím Vám mohu pomoci?");
      speak("Zdravím! S čím vám mohu pomoci?")
      setTimeout(function () {
        recognition.start();
      }, 2500);
      assistantBegin();
    }
    else {
      display("Data se stále načítají. Zkuste to prosím za chilku");
      speak("Data se stále načítají. Zkuste to prosím za chvilku")
    }
  });
});

function assistantEnd() {
  recognition.stop();
  console.log("Speech recognition stopped");
  assistantBeginBtns.forEach(btn => {
    btn.style.animation = 'fadeIn 1s 0.25s forwards';
  });
  assistant.style.animation = 'slideOutToBottom 0.5s forwards cubic-bezier(0.5, 0.1, 0.25, 1)';
}

function assistantBegin() {
  assistantBeginBtns.forEach(btn => {
    btn.style.animation = 'fadeOut 1s 0.25s forwards';
  });
  assistant.style.display = 'block';
  console.log("Speech recognition started");
  assistant.style.animation = 'slideInFromBottom 0.5s forwards cubic-bezier(0.5, 0.1, 0.25, 1)';
}

document.addEventListener('DOMContentLoaded', () => {
  assistant.addEventListener('click', () => {
    assistantEnd();
  });
});

function playMedia(id) {
  assistantMediaModeAnimation();
}