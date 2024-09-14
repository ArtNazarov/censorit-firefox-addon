const AdultUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/adult.txt';
const BetUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/gambling.txt';
const AlcoholUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/alcohol.txt';
const DatingUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/dating.txt';
const DrugsUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/drugs.txt';
const NuditityUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/nudity.txt';
const TobaccoUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/tobacco.txt';
const WearUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/wear.txt';
const AuctionUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/auctions.txt';
const PrisonUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/prison.txt';
const FraudUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/fraud.txt';
const WeaponUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/weapon.txt';
const NegativeUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/negatives.txt';
const HateUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/hate.txt';
const MysticUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/mystic.txt';
const GamingUrl = 'https://raw.githubusercontent.com/ArtNazarov/censorit-chrome-ext/main/blocklist_keywords/gaming.txt';

async function getLines(url) {
  try {
      // Получаем ответ от сервера
      const response = await fetch(url);
      
      // Проверяем, успешен ли ответ
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      // Получаем текст ответа
      const text = await response.text();

      // Разделяем текст на строки и возвращаем массив
      return text.split('\n');
  } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return []; // Возвращаем пустой массив в случае ошибки
  }
}


function addFilterFromArr(arr){
  console.log('Добавляем на форму');
  console.log(arr);
  for(let tag of arr){
    document.getElementById("tags").value =  document.getElementById("tags").value + "\r\n" + tag;
  }
}

function loadFromUrlToApp(url){
  getLines(url)
  .then(lines => {
      console.log('Фильтры из файла:', lines);
      addFilterFromArr(lines);
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
  
}

document.getElementById('adultFilters').onclick = function(e){
  loadFromUrlToApp(AdultUrl);
}

document.getElementById('betFilters').onclick = function(e){
  loadFromUrlToApp(BetUrl);
}

document.getElementById('alcoholFilters').onclick = function(e){
  loadFromUrlToApp(AlcoholUrl);
}

document.getElementById('datingFilters').onclick = function(e){
  loadFromUrlToApp(DatingUrl);
}

document.getElementById('drugsFilters').onclick = function(e){
  loadFromUrlToApp(DrugsUrl);
}

document.getElementById('nudityFilters').onclick = function(e){
  loadFromUrlToApp(NuditityUrl);
}

document.getElementById('tobaccoFilters').onclick = function(e){
  loadFromUrlToApp(TobaccoUrl);
}

document.getElementById('wearFilters').onclick = function(e){
  loadFromUrlToApp(WearUrl);
}

document.getElementById('auctionFilters').onclick = function(e){
  loadFromUrlToApp(AuctionUrl);
}

document.getElementById('prisonFilters').onclick = function(e){
  loadFromUrlToApp(PrisonUrl);
}

document.getElementById('fraudFilters').onclick = function(e){
  loadFromUrlToApp(FraudUrl);
}

document.getElementById('weaponFilters').onclick = function(e){
  loadFromUrlToApp(WeaponUrl);
}

document.getElementById('negativeFilters').onclick = function(e){
  loadFromUrlToApp(NegativeUrl);
}

document.getElementById('hateFilters').onclick = function(e){
  loadFromUrlToApp(HateUrl);
}

document.getElementById('mysticFilters').onclick = function(e){
  loadFromUrlToApp(MysticUrl);
}

document.getElementById('gamingFilters').onclick = function(e){
  loadFromUrlToApp(GamingUrl);
}

function makeVisibleByState(state){
   console.log(state);
    if (state === "UNLOCKED" || state === undefined){
      document.getElementById("main_form").style.display="block";
      document.getElementById("unlock_password_form").style.display="none";
    } else {
      document.getElementById("main_form").style.display="none";
      document.getElementById("unlock_password_form").style.display="block";
    };
}

// Считываем значение настройки после загрузки диалога
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // теги в форму
    let dataTags = await browser.storage.local.get('tags')
    document.getElementById('tags').value = dataTags.tags  || "xxx\nporn";
    // белый список в форму
    let dataWhiteList = await browser.storage.local.get('whitelist');
    document.getElementById('whitelist').value = dataWhiteList.whitelist || "google.com\nwww.google.com";
    let dataState = await browser.storage.local.get("state");
    document.getElementById('state').value = dataState.state  || "UNLOCKED";;
    let dataPassword = await browser.storage.local.get("password");
    document.getElementById("password1").value = dataPassword.password || "";
    document.getElementById("password2").value = dataPassword.password || "";
    makeVisibleByState(dataState.state);
  } catch (error) {
    console.log("Error", error);
  }
});

// Обработка сохранения формы
document.getElementById('saveButton').addEventListener('click', () => {
    // Сохраняем теги в лок. хран.
    const myTags = document.getElementById('tags').value;
    browser.runtime.sendMessage({ tags: myTags });
    // Сохраняем белый список в лок. хран.
    const myWhiteList = document.getElementById('whitelist').value;
    browser.runtime.sendMessage({ whitelist: myWhiteList });

});

// Изменение пароля
document.getElementById('btnSetPassword').addEventListener('click', ()=>{
  const password1 = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;
  if (password1 == password2){
    browser.runtime.sendMessage({password: password1});
    console.log('Password changed to ', password1);
    browser.runtime.sendMessage({state: "LOCKED"});
  };
});

// Вход в расширение
document.getElementById('btnLogin').addEventListener('click', async()=>{
  const password = document.getElementById('password').value;
  const dataExpectedPassword = await browser.storage.local.get("password");
  if (password == dataExpectedPassword.password){
    const state = "UNLOCKED";
    browser.runtime.sendMessage({state: state});
    makeVisibleByState(state);
  };
});

// Выход из расширения
document.getElementById('btnLogout').addEventListener('click', async()=>{
    const state = "LOCKED";
    browser.runtime.sendMessage({state: state});
    makeVisibleByState(state);
});