export default class fixerIO{

    constructor(){
        this.url ="";
    }
    getData(){
        let serviceChannel = new XMLHttpRequest();
        let url = this.url;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr);
            xhr.send();
          });
    }
    
  }


