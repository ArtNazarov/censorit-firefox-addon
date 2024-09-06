function addLayer(){
    // Create the layer element
    const layer = document.createElement('div');
    
    // Set the ID
    layer.id = 'blank_screen_page';
    
    // Set CSS properties
    layer.style.position = 'fixed'; // Position it fixed to cover the viewport
    layer.style.top = '0'; // Align to the top
    layer.style.left = '0'; // Align to the left
    layer.style.width = '100vw'; // Full width
    layer.style.height = '100vh'; // Full height
    layer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Semi-transparent background
    layer.style.backdropFilter = 'blur(10px)';
    layer.style.zIndex = 9999;
    
    // Append the layer to the body
    document.body.appendChild(layer);
    return layer;
    }
    
    function addInfo(title, message){
      // Create the layer element
      const layer = document.createElement('div');
      
      // Set the ID
      layer.id = 'information_page';
      
      // Set CSS properties
      layer.style.position = 'fixed'; // Position it fixed to cover the viewport
      layer.style.top = '0'; // Align to the top
      layer.style.left = '0'; // Align to the left
      layer.style.width = '100vw'; // Full width
      layer.style.height = '100vh'; // Full height
      layer.style.backgroundColor = '#000';
      layer.style.color = '#f00'; 
      layer.style.zIndex = 10000;
      layer.innerHTML = `<h1 style="text-align:center">${title}</h1><p>${message}</p>`;
      // Append the layer to the body
      document.body.appendChild(layer);
      return layer;
      }
    
    function isDocumentHasTag(tag) {
      // Приводим тег к нижнему регистру для регистронезависимого сравнения
      tag = tag.toLowerCase();
    
      // Проверяем, является ли тег подстрокой текущего домена
      if (window.location.hostname.toLowerCase().includes(tag)) {
        return true;
      }
    
      // Проверяем, является ли тег подстрокой текущего URL
      if (window.location.href.toLowerCase().includes(tag)) {
        return true;
      }
    
      // Получаем параметры URL в виде объекта
      const urlParams = new URLSearchParams(window.location.search);
    
      // Проверяем, является ли тег подстрокой одного из параметров или значений параметров
      for (const [key, value] of urlParams) {
        if (key.toLowerCase().includes(tag) || value.toLowerCase().includes(tag)) {
          return true;
        }
      }
    
      // Поиск по тексту
       const elements = document.querySelectorAll('*'); 
       for (let element of elements){
        if (element.textContent.toLowerCase().includes(tag)){
          return true;
        }
       }
    
      
    
      // Если тег не найден нигде, возвращаем false
      return false;
    }

document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get('tags', (data) => {
        if (data.tags) {
            // const p = document.createElement('p');
            // p.textContent = `Теги: ${data.tags}`;
            // document.body.appendChild(p);
            // console.log(data.tags);


            let layer = addLayer();
  
  
            var readyStateCheckInterval = setInterval(function() {
         
           
        
        
            if (document.readyState === "complete") {
                
            clearInterval(readyStateCheckInterval);
          
            
                // ----------------------------------------------------------
                // This part of the script triggers when page is done loading
                console.log("(C) CensorIt Nazarov A.A., 2024, Orenburg, Russia");
                console.log("Расширение готово к работе!");
        
                        // ----------------------------------------------------------
          
         
          
          console.log('Теги из локального хранилища = ' + data.tags );
          
          let tags =  data.tags;
           
          let arrTags = tags.split(/\r?\n/);  
         
          let flag = false;
          let foundedStr = "";
          for (let i=0;i<arrTags.length;i++){
            let tag = arrTags[i].trim();
            if (tag !== "" && isDocumentHasTag(tag)){
              console.log(`Тег ${tag} найден! `);
              foundedStr += " "+tag;
              flag = true;
            } else {
              console.log(`Тег ${tag} не найден... `);
            }
          }
        
          if (flag){
            document.body.innerHTML = '';
            addInfo("Заблокировано", "Найден(ы):" + foundedStr);
            let counter = 0;
            setInterval( function(){if (counter>3) { window.location.href = "http://0.0.0.0";}; counter++;}, 2000);
            
          } else {
            layer.remove();
          }
          
                  
                }
            }
            , 1500);



        }
    });
});
