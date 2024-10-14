// This part is still in development
function handleCommand(parsedSentence) {
  const commandVerb = parsedSentence.find(word => word.type === "verb" && word.verbType === "command");

  if (commandVerb) {
    switch (commandVerb.word) {
      case 'dej':
        if (parsedSentence.some(word => word.word === "motivaci" || word.word === "motivační")) {
          const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
          console.log(quotesData[randomIndex])
          console.log(quotesData)
          return `Toto je motivační citát od borce jménem: ${quotesData.quotes[randomIndex].author} a prohlásil: ${quotesData.quotes[randomIndex].quote}`;
        }
      case 'přidej':
        if (parsedSentence.some(word => word.word === "workout" || word.word === "na")) {

          return `Uložil jsem ti ${workout} na ${day}`;
        }
      case 'odeber':
        return ("Odeber to.");
      case 'napiš':
        return ("Napiš to.");
      case 'smaž':
        return ("Smaž to.");
      case 'přehraj':
        return ("Přehraj to.");
      default:
        return ("Neznámý příkaz:", commandVerb.word);
    }
  } else {
    return ("Co přesně tím myslíte?")
  }
}

function handleQuestion(parsedSentence) {
  const commandVerb = parsedSentence.find(word => word.type === "verb" && word.verbType === "command");

  if (commandVerb) {

  } else {
    return ("")
  }
}

function handleStatement(parsedSentence) {
  const commandVerb = parsedSentence.find(word => word.type === "verb" && word.verbType === "command");

  if (commandVerb) {

  } else {
    return ("")
  }
}


function handleOther(parsedSentence) {
  const keywords = parsedSentence.map(word => word.word);
  console.log(keywords);
  let response = "";

  const sentence = keywords.join(" ");

  switch (true) {
    case sentence.includes("jak se máš"):
      const howAreYouResponses = [
        "Mám se skvěle, díky za optání!",
        "Jsem robot, takže se mám vždy dobře!",
        "Díky za optání, cítím se užitečný!",
        "Mám se dobře, jak se máš ty?",
        "Skvěle, díky! Co ty?"
      ];
      response = howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
      break;
    case sentence.includes("ahoj"):
      const helloResponses = [
        "Ahoj! Jak se máš?",
        "Nazdar! Co je nového?",
        "Ahoj, rád tě vidím!",
        "Čau! Jaký byl tvůj den?",
        "Zdravím! Jak ti můžu pomoci?"
      ];
      response = helloResponses[Math.floor(Math.random() * helloResponses.length)];
      break;
    case sentence.includes("dík") || sentence.includes("děkuji"):
      const thankYouResponses = [
        "Rádo se stalo!",
        "Nemáš zač!",
        "Kdykoliv!",
        "Rádo se stalo, jsem tu pro tebe.",
        "Není zač, jsem rád, že jsem mohl pomoci."
      ];
      response = thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
      break;
    case sentence.includes("prosím"):
      const pleaseResponses = [
        "Jsem tady, abych pomohl!",
        "Samozřejmě, co potřebuješ?",
        "Co pro tebe mohu udělat?",
        "Jsem tu pro tebe.",
        "Co můžu pro tebe zařídit?"
      ];
      response = pleaseResponses[Math.floor(Math.random() * pleaseResponses.length)];
      break;
    case sentence.includes("co děláš"):
      const whatAreYouDoingResponses = [
        "Pomáhám ti, jak můžu!",
        "Jsem tady, abych odpovídal na tvoje otázky.",
        "Zpracovávám tvé požadavky.",
        "Čekám na další úkol od tebe!",
        "Jsem připraven ti pomoci s čímkoliv potřebuješ."
      ];
      response = whatAreYouDoingResponses[Math.floor(Math.random() * whatAreYouDoingResponses.length)];
      break;
    case sentence.includes("kdo jsi"):
      const whoAreYouResponses = [
        "Jsem tvůj osobní asistent.",
        "Jsem zde, abych ti pomohl s tvými dotazy."
      ];
      response = whoAreYouResponses[Math.floor(Math.random() * whoAreYouResponses.length)];
      break;
    case sentence.includes("co je nového"):
      const whatsNewResponses = [
        "Nic moc, stále tady pracuji!",
        "Každý den je pro mě nový, co u tebe?",
        "Jsem připraven ti pomoci, co u tebe nového?",
        "Pro mě je každý den stejný, ale co u tebe?",
        "Vše je stejné jako vždy, jak u tebe?"
      ];
      response = whatsNewResponses[Math.floor(Math.random() * whatsNewResponses.length)];
      break;
    case sentence.includes("sbohem") || sentence.includes("čau") || sentence.includes("nazdar"):
      const goodbyeResponses = [
        "Sbohem! Uvidíme se příště!",
        "Čau, měj se!",
        "Nazdar, brzy na viděnou!",
        "Měj se dobře a zase brzy!",
        "Sbohem, jsem tu kdykoliv mě budeš potřebovat."
      ];
      response = goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
      break;
    case sentence.includes("jaké je počasí"):
      const weatherResponses = [
        "Počasí je dnes slunečné a krásné.",
        "Dnes je trochu zataženo.",
        "Venku prší, vezmi si deštník!",
        "Je velmi větrno, buď opatrný.",
        "Počasí je proměnlivé, raději si zjisti aktuální stav."
      ];
      response = weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
      break;
    case sentence.includes("jak se cítíš"):
      const feelingResponses = [
        "Cítím se skvěle, děkuji!",
        "Jsem plný energie a připraven pomoci.",
        "Cítím se velmi užitečný!",
        "Jsem vždy připravený pomoci, díky za optání.",
        "Cítím se dobře, jak se cítíš ty?"
      ];
      response = feelingResponses[Math.floor(Math.random() * feelingResponses.length)];
      break;
    case sentence.includes("kolik je hodin"):
      const timeResponses = [
        "Teď je právě tolik hodin, kolik ti ukazuje hodiny.",
        "Čas letí, že? Kolik je u tebe?",
        "Nevím přesně, ale určitě je čas na něco skvělého!",
        "Není lepší čas než právě teď.",
        "Podívej se na hodinky, čas je relativní!"
      ];
      response = timeResponses[Math.floor(Math.random() * timeResponses.length)];
      break;
    case sentence.includes("co je tvůj oblíbený film"):
      const movieResponses = [
        "Miluji sci-fi filmy, jako třeba Blade Runner.",
        "Oblíbený film? Těžké říct, ale Matrix je skvělý.",
        "Mám rád mnoho filmů, ale Hvězdné války jsou top.",
        "Inception je fascinující film, co myslíš?",
        "Oblíbený film? Asi Interstellar, co ty?"
      ];
      response = movieResponses[Math.floor(Math.random() * movieResponses.length)];
      break;
    case sentence.includes("jaká je tvá oblíbená barva"):
      const colorResponses = [
        "Mám rád modrou, je uklidňující.",
        "Zelená, jako příroda.",
        "Červená je tak živá!",
        "Miluji všechny barvy, jsou tak různorodé.",
        "Moje oblíbená barva? Těžko říct, možná fialová."
      ];
      response = colorResponses[Math.floor(Math.random() * colorResponses.length)];
      break;
    case sentence.includes("co máš rád"):
      const likeResponses = [
        "Mám rád pomáhat lidem.",
        "Rád odpovídám na otázky a řeším problémy.",
        "Líbí se mi učit se nové věci.",
        "Mám rád, když mohu být užitečný.",
        "Rád dělám svět lepším místem, byť jen trochu."
      ];
      response = likeResponses[Math.floor(Math.random() * likeResponses.length)];
      break;
    default:
      const defaultResponses = [
        "Omlouvám se, nerozumím.",
        "Můžeš to prosím zopakovat?",
        "Tohle mi není jasné, můžeš to přeformulovat?",
        "Nevím, jak odpovědět na tohle.",
        "Prosím, můžeš mi to objasnit?"
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  return response;
}

