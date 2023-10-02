const firstNames = [
  'Alberta (f)',
  'Asriel (m)',
  'Astrid (f)',
  'Audrey (u)',
  'Zakarya (f)',
  'Dante (m)',
  'Deckard (m)',
  'Gaitan (m)',
  'Geoff (m)',
  'Georgia (f)',
  'Gladion (m)',
  'Guili (u)',
  'Joel (m)',
  'Keith (u)',
  'Kion (m)',
  'Laury (f)',
  'Levi (m)',
  'Lillie (f)',
  'Lusamine (f)',
  'Lyra (f)',
  'Mabarak (m)',
  'Mallow (u)',
  'Mark (m)',
  'Rael (u)',
  'Rauani (f)',
  'Rauni (f)',
  'Rhea (f)',
  'Sadako (f)',
  'Todrick (m)',
  'Harlan (m)',
  'Garret (m)',
  'Brock (u)',
  'Everett (m)',
  'Ellery (f)',
  'Salatiel (u)',
  // 'Billie (u) (American)',
  // 'Mikhail (m) (German)',
  // 'Mukhtar (m) (African)',
  // 'Raphäelle (f) (France)',
  // 'Ulric (m) (German)',
  // 'Albie (m) (English)',
  // 'Alec (m) (English)',
  // 'Alex (u) (English)',
  // 'Bert (m) (English)',
  // 'Bertie (u) (English)',
  // 'Lex (m) (English)',
  // 'Sandy (u) (English)',
  // 'Xander (m) (English)',
  // 'Zander (m) (English)',
  // 'Alaina (f) (English)',
  // 'Alana (f) (English)',
  // 'Alanna (f) (English)',
  // 'Alannah (f) (English)',
  // 'Alayna (f) (English)',
  // 'Alexandra (f) (English)',
  // 'Alexandrea (f) (English)',
  // 'Alexandria (u) (English)',
  // 'Allyn (f) (English)',
  // 'Alanis (f) (English)',
  // 'Alannis (f) (English)',
]

const hawaianNames = [
  'Anela (f)',
  'Oliana (f)',
  'Akoni (m)',
  'Kai (m)',
  'Kaleo (m)',
  'Kalani (f)',
  'Malia (f)',
  'Nalu (f)',
]

const lastNames = [
  'Beckham (English)',
  'Haustrain',
  'Jeha',
  'Liers',
  'MacCord',
  'Monfrini',
  'Nielsen (German)',
  'Tizue (Japan)',
  'Oelke',
]

let delay = -0.4
function createListNames(listNames, title) {
  delay = delay + 0.4
  let list = ''

  for (const name of listNames.sort()) {
    list += '<li>' + name + '</li>'
  }

  return `
    <div class="card" style="animation-delay: ${delay}s">
        <h2>${title}</h2>
        <ul>
        ${list}
        </ul>
    </div>
    `
}

document.querySelector('#cards').innerHTML =
  createListNames(firstNames, 'Nomes') +
  createListNames(hawaianNames, 'Nomes Havaianos') +
  createListNames(lastNames, 'Sobrenomes')
