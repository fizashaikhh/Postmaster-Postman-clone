//JSON is default so hide parameters box
let parametersbox = document.getElementById('parametersbox')
let jsonbox = document.getElementById('JSONtext');
parametersbox.style.display = 'none';//hide

//if use clicks on params hide JSON box else hide params box

let customradio = document.getElementById('custom')
customradio.addEventListener('click', () => {
  jsonbox.style.display = 'none'
  parametersbox.style.display = 'block';

})

let jsonradio = document.getElementById('json')

jsonradio.addEventListener('click', () => {
  parametersbox.style.display = 'none';
  jsonbox.style.display = 'block'

})

//If user clicks on '+' button add mmore paramters
let index = 1;
let addparam = document.getElementById('addparam1')
addparam.addEventListener('click', () => {
  index++;
  let html = ` <div class="col form-group row removeparam">
  <label class="col-sm-2 col-form-label">Parameter ${index}</label>
  <div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${index}" placeholder="Enter parameter ${index} key">
  </div>
  <div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${index}" placeholder="Enter parameter ${index} value">
  </div>
  <button id="removeparam${index}" class="btn btn-primary">-</button>

</div>`

  let element = getElementByString(html);
  parametersbox.appendChild(element)

  //To remove parameter on clicking '-'
  let deleteparam = document.getElementsByClassName('removeparam')
  let value = 2;
  for (const element of deleteparam) {
    element.getElementsByTagName('button')[0].addEventListener('click', (e) => { // get the first button element for this object
      element.getElementsByTagName('button')[0].parentElement.remove();
      value++;
    })
  }

})
//Make a DOM object to append
function getElementByString(html) {
  let element = document.createElement('div')
  element.classList = 'col form-group row';
  element.innerHTML = html;
  return element.firstElementChild

}


//If the user clicks on 'submit' button
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  // document.getElementById('responsebox').placeholder = 'Please wait....Fetching response'
document.getElementById('responseprism').innerHTML = 'Please wait....Fetching response'
  let url = document.getElementById('url').value
  let requestType = document.querySelector("input[name='requesttype']:checked").value;
  let contentType = document.querySelector("input[name='contenttype']:checked").value;
  let data = {};



  if (contentType == 'Custom') {
    for (let i = 1; i <= index; i++) {
      if (document.getElementById('parameterKey' + i) != undefined) {// For deleted parameter        
        let key = document.getElementById('parameterKey' + i).value
        let value = document.getElementById('parameterValue' + i).value
        data[key] = value;

      }
    }
    data = JSON.stringify(data)
  }
  else {
    data = document.getElementById('JSONtextbox').value
  }
//If the request type is POST and invoke fetch API to POST a request
if (requestType=='GET'){
  fetch(url, {
      method: 'GET',   
  })
  .then(response=> response.text())
  .then((text) =>{
      // document.getElementById('responsebox').value = text;
      document.getElementById('responseprism').innerHTML = text;
      Prism.highlightAll();
  });
}

else{
  fetch(url, {
      method: 'POST', 
      body: data,
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        }  
  })
  .then(response=> response.text())
  .then((text) =>{
      // document.getElementById('responsebox').value = text;
      document.getElementById('responseprism').innerHTML = text;
      Prism.highlightAll();
  });
}
})