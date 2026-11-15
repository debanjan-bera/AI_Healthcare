import { useRef, useState } from "react";
import API from "../utils/api";


export default function Home(){

  const recorder =
    useRef<MediaRecorder | null>(null);

  const chunks =
    useRef<Blob[]>([]);


  const [recording,setRecording] =
    useState(false);

  const [userText,setUserText] =
    useState("");

  const [agentText,setAgentText] =
    useState("");



  // START MICROPHONE

  const startRecording =
    async()=>{


      chunks.current = [];


      const stream =
        await navigator.mediaDevices
        .getUserMedia({
          audio:true
        });



      recorder.current =
        new MediaRecorder(stream);



      recorder.current.ondataavailable =
        (event)=>{

          chunks.current.push(
            event.data
          );

        };



      recorder.current.start();


      setRecording(true);

    };





  // STOP + SEND TO EXPRESS


  const stopRecording =
    ()=>{


      recorder.current?.stop();


      recorder.current!.onstop =
        async()=>{


          const audioBlob =
            new Blob(
              chunks.current,
              {
                type:"audio/webm"
              }
            );



          const formData =
            new FormData();



          formData.append(
            "audio",
            audioBlob,
            "voice.webm"
          );




          const response =
            await API.post(

              "ai/voice",

              formData,

              {
                headers:{
                  "Content-Type":
                  "multipart/form-data"
                }
              }

            );



            /*
            response:

            {
              text:"",
              reply:"",
              audio:"outputs/file.wav"
            }

            */


            setUserText(
              response.data.text
            );


            setAgentText(
              response.data.reply
            );



            playAudio(
              response.data.audio
            );

        };


        setRecording(false);

  };





  // PLAY RESPONSE AUDIO


function playAudio(base64Data:string){

  const url = `data:audio/wav;base64,${base64Data}`;

  console.log("AUDIO URL: Playing from memory");

  const audio = new Audio(url);

  audio.play()
  .catch(err=>{
 console.log("Audio error:",err);
});

}




return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
    
    <h2 className="text-3xl font-bold text-center text-gray-800">
      Voice Agent
    </h2>

    <div className="flex justify-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`
          px-8 py-3 rounded-full font-semibold text-white 
          transition-all duration-300 shadow-lg
          ${
            recording
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {recording ? "Stop Recording" : "Speak"}
      </button>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">
        You:
      </h3>

      <div className="min-h-24 bg-gray-50 border rounded-xl p-4">
        <p className="text-gray-600">
          {userText || "Your speech will appear here..."}
        </p>
      </div>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">
        Assistant:
      </h3>

      <div className="min-h-24 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-gray-700">
          {agentText || "Assistant response will appear here..."}
        </p>
      </div>
    </div>

  </div>
</div>

);


}