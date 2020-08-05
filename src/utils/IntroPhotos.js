export default function getImage() {
    let photos = ["../assets/img/INTRO_BACKGROUND.png", "../assets/img/INTRO_BACKGROUND_BLUR"];
    return photos[Math.floor(Math.random() * photos.length)];
}