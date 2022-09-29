use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as console_log;

#[wasm_bindgen]
pub fn grayscale(base64_encoded_file:&str) {
    console_log(&base64_encoded_file.into());
}
