const firstNames = ['Alberta (f)', 'Asriel (m)', 'Astrid (f)', 'Audrey (u)', 'Billie (u) (American)', 'Zakarya (f)', 'Dante (m)', 'Deckard (m)', 'Gaitan (m)', 'Geoff (m)', 'Georgia (f)', 'Gladion (m)', 'Guili (u)', 'Joel (m)', 'Keith (u)', 'Kion (m)', 'Laury (f)', 'Levi (m)', 'Lillie (f)', 'Lusamine (f)', 'Lyra (f)', 'Mabarak (m)', 'Mallow (u)', 'Mark (m)', 'Mikhail (m) (German)', 'Mukhtar (m) (African)', 'Rael (u)', 'Raphäelle (f) (France)', 'Rauani (f)', 'Rauni (f)', 'Rhea (f)', 'Sadako (f)', 'Todrick (m)', 'Ulric (m) (German)']
const hawaianNames = ['Anela (f)', 'Oliana (f)', 'Akoni (m)', 'Kai (m)', 'Kaleo (m)', 'Kalani (f)', 'Malia (f)', 'Nalu (f)']
const lastNames = ['Beckham(English)', 'Haustrain', 'Jeha', 'Liers', 'MacCord', 'Monfrini', 'Nielsen(German)']

let delay = -0.4;
function createListNames(listNames, title) {
  delay = delay + 0.4;
  let list = ""
  
  for (let name of listNames.sort()) {
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
