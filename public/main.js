function showSpinner() {
  document.getElementById('title').innerText = 'Processing'
  document.getElementById('spinner').parentElement.removeAttribute('hidden')

}
function showResultImg(imgUrl) {
  document.getElementById('spinner').setAttribute('hidden', true)
  document.getElementById('title').innerText = 'Result'
  document.getElementById('new-img').setAttribute('src', imgUrl)
}

async function init() {
  let rustApp = null

  try {
    rustApp = await import('../pkg')
  } catch (e) {
    console.error(e)
    return
  }

  const input = document.getElementById('upload')

  // using filereader to transfer strings between JS and Rust
  // easier to transfer strings than binary data across languages
  const fileReader = new FileReader()

  input.addEventListener('change', () => {
    showSpinner()
    fileReader.readAsDataURL(input.files[0])
  })



  fileReader.onloadend = () => {
    const base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    )

    const grayscaledImgUrl = rustApp.grayscale(base64)
    showResultImg(grayscaledImgUrl)
  }
}

init()
