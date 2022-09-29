use std::io::Cursor;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1;
use base64::{decode, encode};
use image::load_from_memory;
use image::ImageOutputFormat::Png;

fn console_log(str_data: &str) {
    log_1(&str_data.into());
}


#[wasm_bindgen]
pub fn grayscale(base64_encoded_file: &str) -> String {
    console_log(".grayscale() call...".into());

    let base64_vec = decode(base64_encoded_file).unwrap();
    console_log("decoded img");

    let mut img = load_from_memory(&base64_vec).unwrap();
    console_log("loaded img");

    img = img.grayscale();
    console_log("grayscale effect applied");

    let mut buffer = vec![];
    let mut writer = Cursor::new(&mut buffer);
    img.write_to(&mut writer, Png).unwrap();
    console_log("img written");

    format!("data:image/png;base64,{}", encode(&buffer))
}
