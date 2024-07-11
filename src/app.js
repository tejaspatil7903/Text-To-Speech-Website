let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
  createDownloadLink(speech.text);
});

function createDownloadLink(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speech.voice;
  utterance.onend = (event) => {
    const audioBlob = new Blob([event.utterance], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const downloadLink = document.getElementById("download-link");
    downloadLink.href = audioUrl;
    downloadLink.download = "tts-audio.wav";
    downloadLink.style.display = "inline";
  };
  window.speechSynthesis.speak(utterance);
}
