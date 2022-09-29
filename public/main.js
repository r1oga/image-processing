async function init() {
  let rustApp = null

  try {
    rustApp = import('../pkg')
  } catch (e) {
    console.error(e)
    return
  }

  console.log(rustApp)
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
    console.log({ base64, raw: input.files[0] })
  }
}

init()
