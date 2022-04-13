const video = document.getElementById('video')
const label = document.getElementById('label-container');
const start_smile = new Audio('static/mixkit-camera-shutter-click-1133.wav');
const end_smile = new Audio('static/beep-07a.wav');
let counter = 0;
let time = 0;
let passedState = '';
let currentState = '';
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../static/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../static/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../static/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        for (const [key, value] of Object.entries(resizedDetections.expressions)) {
            if (value > 0.9) {
                currentState = key;

                console.log(passedState);
                console.log(currentState);
                if (passedState != currentState) {
                    passedState = currentState;
                    if (currentState == 'happy') {
                        start_smile.play();
                        counter++;
                    } //else {
                    //     end_smile.play();
                    // }
                } else {
                    if (currentState == 'happy') {
                        time = time + 0.125;
                    }
                }

            }
        }
        label.innerHTML = 'Smiles : ' + counter + '<br>' + 'Time : ' + Math.trunc(time) + 's';
    }, 50)

})