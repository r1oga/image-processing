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
    fileReader.readAsDataURL(input.files[0])
  })

  fileReader.onloadend = () => {
    const base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    )

    rustApp.grayscale(base64)
  }
}

init()
