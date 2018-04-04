 /**
 * Multiply
 * Copyright 2018 WEB-group
 * @version 5.0
 * @author WEB-group
 */
;function Multiply(options){
  /**
   * настройка options
   */
  var options = {
    elem: options.elem,
    count: options.count || 10,
    title: options.title || 'ТАБЛИЦА',
    captionAlign: options.captionAlign || 'text-center',
    captionColor: options.captionColor || 'black',
    captionSize: options.captionSize || '1rem',
  };
  
/**
 * Создание DOM element
 */
 function initialize(){

  // шаблон структуры - использована библиотека lodash
  var tmpl = _.template('\
    <table class="multiply">\
        <caption><%=tableTitle%></caption>\
        <% for (var i=1; i<=count; i++) { %>\
          <tr>\
            <% for (var j=1; j<=count; j++) { %>\
              <td><%=i*j%></td>\
            <% } %>\
          </tr>\
        <% } %>\
      </table>');
  
  // генерирование структуры с учетом переданных значений  
  var result = tmpl({count: options.count, tableTitle: options.title});
 

  // добавление на страницу в контейнер
  options.elem.innerHTML =  result;

 }
  
  /**
   * Установка настроек заголовка таблицы
   */
  function setCaptionProperty(){
    var caption = options.elem.querySelector('caption');
    caption.classList.add(options.captionAlign);
    caption.style.color = options.captionColor;
    caption.style.fontSize = options.captionSize;
  }

  /**
   * Реализация подсветки строк и столбцов
   */
  function changeColor(e,valueStyle){
    var target = e.target;
    if(target.tagName == 'TD'){
      
      //по текущему элементу находим родителя(tr) и все td в нем  
      // tr.cells – коллекция ячеек TD/TH    
      var tdRows = target.parentElement.cells;
      for (var i = 0; i < tdRows.length; i++) {
        tdRows[i].style.color =valueStyle;
      }

      // номер ячейки в строке
      var tdIndex = target.cellIndex
      //  все td c таким индексом во всех строках
      var tdCols = options.elem.querySelectorAll('td:nth-child('+( tdIndex + 1 )+')')
      for (var j = 0; j < tdCols.length; j++) {
        tdCols[j].style.color =valueStyle;
      }
    } 
  }
 
  // Создание DOM element
  initialize();
  // Установка настроек заголовка таблицы
  setCaptionProperty();
  // Реализация подсветки строк и столбцов при наведении/уведении
  options.elem.addEventListener('mouseover', function(){changeColor(event,'red')});
  options.elem.addEventListener('mouseout', function(){changeColor(event,'')});

};