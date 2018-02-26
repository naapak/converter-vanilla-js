
import fixerData from './fixerIO';

export default class App {

    constructor(){
        let thisinstance = this
        window.addEventListener('load', function () {
            var converterList = document.querySelectorAll('.currency_converter');
            converterList.forEach(function (selectedDiv) {
            thisinstance.addhtml(selectedDiv); 
          });
        });

}

    addhtml(selectedDiv){
      selectedDiv.innerHTML = this.newWidget();
      
      this.initfixerIO(selectedDiv);
      let self = this;
      selectedDiv.querySelector("#base_list").addEventListener("change", function(){ 
          self.initfixerIO(selectedDiv);           
      }, false);
        
}

    initfixerIO(widget){
        let fixer = new fixerData();

        let baseList = widget.querySelector("#base_list");
        let currencyData = '';
    
        fixer.url = `https://api.fixer.io/latest?base=${baseList.value}`; 

        let currency = fixer.getData();

        let targetCurrency = widget.querySelector("#target_list");
        let baseInput = widget.querySelector("#base_input");
        let targetInput = widget.querySelector("#target_output");

        let targetElement = {
          baseList,
          baseInput,
          targetInput,
          targetCurrency
        };
        
        let self = this;

        currency.then((data) => {
          currencyData = JSON.parse(data);
          self.changeTarget(currencyData,targetElement);
          baseInput.addEventListener("input", function(){ self.changeTarget(currencyData,targetElement);}, false);
          targetCurrency.addEventListener("change",function(){ self.changeTarget(currencyData,targetElement);} ,false);
        }).catch((reject) => {this.handleError(reject);})  
     
}



changeTarget(data,target) {
  if(target.baseList.value !== target.targetCurrency.value ) {
    target.targetInput.value = (data.rates[target.targetCurrency.value] * target.baseInput.value).toFixed(2);
  } else {
    target.targetInput.value =  target.baseInput.value;
  }
}

handleError(error) {
  if (error.status == 0 ){
    widget.querySelector("#error").innerHTML = "Looks like your internet is down"
  } else {
    widget.querySelector("#error").innerHTML = error.statusText;
  }
}


newWidget() {
  let x =  ` <h1>Currency Converter</h1>
  <table id="converter_table" >
    <tbody>
        <tr><td><p>Type in amount and select currency:</p></td></tr>
      <tr>
        <td>
          <input class="slds-select" id="base_input"   name="input" type="number" value="1">
        </td>
        <td type="default" class=""></td>
        <td>
            <select  class="slds-select " id="base_list"   name="Select currency1" >
                <option  value="CAD" selected="selected"> CAD </option>
                <option  value="USD"> USD </option>
                <option  value="EUR"> EUR </option>
            </select>
        </td>
      </tr>
      <tr><td><p>Converted Amount:</p></td></tr>
      <tr>
        <td>
          <input  class="slds-select " id="target_output" name="output" disabled>
        </td>
        <td></td>
        <td>
            <select class="slds-select " id="target_list"  name="Select currency2">
                <option  value="CAD"> CAD </option>
                <option  value="USD" selected="selected"> USD </option>
                <option  value="EUR"> EUR </option>
            </select>
        </td>
      </tr>
    </tbody>
    </table>
    <p id="error" ></p>
  <div class="disclaimer_link">
  <a href="disclaimer.html">Disclaimer</a>
  </div>`;
  return x;
}


}