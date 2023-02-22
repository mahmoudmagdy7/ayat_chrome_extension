let stop = true; // must be dynamic
let ayahText;
///////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  if (stop) {
    getData()
  } else {
    setInterval(getData, 5000)
  }
});

//////////////////////// fetching the date///////////////////////////////////
function getData() {
  let surahApi
  let ayahNumber = Math.floor(Math.random() * 6236)
  surahApi = new XMLHttpRequest();
  surahApi.open('get', `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar`)
  surahApi.send()
  surahApi.addEventListener('loadend', function () {
    let ayah = JSON.parse(surahApi.response).data.text;
    ayahText = ayah;
    console.log('getting data');
    show()
  })
}

///////////////////////// display the data //////////////////////////////////
function show() {
  let container = document.createElement("div");
  document.body.appendChild(container);
  container.innerHTML = ayahText;
  container.style.padding = '10px 20px';
  container.classList.add('quote');
  if (ayahText.length >= 100) {
    let timer = setTimeout(() => { container.classList.add('d-none') }, ayahText.length * 50);
    container.style.animationDuration = `${ayahText.length / 20}s`; // best duration
    document.addEventListener('mouseover', function (e) {
      console.log(e.target.classList == 'quote');
    })
  } else {
    container.style.animationDuration = `5s`;
    let timer = setTimeout(() => { container.classList.add('d-none') }, 6000);
    document.addEventListener('mouseover', function (e) {
      clearTimeout(timer)
      console.log(e.target.classList == 'quote');
    })
  }
// close the notification onclick
  container.addEventListener('click', () => { container.style.display = 'none' })

}


