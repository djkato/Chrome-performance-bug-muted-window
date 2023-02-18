/**
 * Initialise web audio api
 */
let audio_context
const audio_element = document.querySelector("#audio")
audio_element.src = "Jamie xx - Sleep Sound.mp3"

//audio nodes
let track
let audio_context_analyzer

function main() {
    audio_context = new AudioContext()

    track = audio_context.createMediaElementSource(audio_element)
    audio_context_analyzer = audio_context.createAnalyser(audio_element)

    audio_context_analyzer.fftSize = 1024
    audio_context_analyzer.smoothingTimeConstant = .2
    track.connect(audio_context_analyzer).connect(audio_context.destination)

    audio_element.play()
    animate()

}

function animate() {
    const svg_canvas = document.querySelector("#svgCanvas")
    let initial_shape = new Array()
    for (let i = 0; i < 200; i++) {
        initial_shape.push({
            x: (svg_canvas.viewBox.baseVal.width / 200) * i,
            y: svg_canvas.viewBox.baseVal.height / 2 - (0 / 200) * i
        })
    }

    let fft_data_array = new Float32Array(200)
    audio_context_analyzer.getFloatFrequencyData(fft_data_array)
    /**
     * mutate svg default shape by audio
    */
    let mutated_shape = new Array()
    for (let i = 0; i < fft_data_array.length; i++) {
        mutated_shape.push({
            x: (initial_shape[i].x /** ((Math.max(this.#FFTDataArray[i] + 100)) * 4)*/),
            y: (initial_shape[i].y - Math.min(initial_shape[i].y, Math.max(fft_data_array[i] * 2 + 200, 0)))
        })
    }

    /**
     * create svg element
     */
    let path = `M ${0} ${svg_canvas.viewBox.baseVal.height} `
    for (let i = 0; i < mutated_shape.length; i++) {
        path += `L ${mutated_shape[i].x},${mutated_shape[i].y} `
    }
    path += `L ${svg_canvas.viewBox.baseVal.height} ${svg_canvas.viewBox.baseVal.height / 2} `
    path += `L ${svg_canvas.viewBox.baseVal.height} ${svg_canvas.viewBox.baseVal.height} `
    path += `Z `
    path = `<path width="100%" height="100%" d="${path}" stroke="none" fill="#c084fc"/>`

    svg_canvas.innerHTML = path

    const drawVisual = requestAnimationFrame(animate)
}   