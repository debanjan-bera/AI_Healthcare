from dotenv import load_dotenv

from livekit import agents
from livekit.agents import AgentServer, AgentSession, Agent, inference, room_io, TurnHandlingOptions
from livekit.plugins import ai_coustics, sarvam, google


load_dotenv()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a helpful voice SARVAM AI assistant.
            You eagerly assist users with their questions by providing information from your extensive knowledge. Use only 4 to 5 words

            """,
        )

server = AgentServer()

@server.rtc_session(agent_name="healthcare-agent")
async def my_agent(ctx: agents.JobContext):
    session = AgentSession(
        stt=sarvam.STT(
            language="en-IN",
            model="saaras:v4",
            mode="transcribe",  # default
            sample_rate=16000,
            high_vad_sensitivity=True,
        ),
        llm=google.LLM(
            model="gemini-3.5-flash",
            ),
        tts=sarvam.TTS(
            target_language_code="hi-IN",
            model="bulbul:v3",
            speaker="roopa",
            speech_sample_rate=22050,
            pace=1.0,
            output_audio_bitrate="128k",
            output_audio_codec="mp3",
            min_buffer_size=50,
            max_chunk_length=150,
            send_completion_event=True),
   
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(),
        ),
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=ai_coustics.audio_enhancement(model=ai_coustics.EnhancerModel.QUAIL_VF_S),
            ),
        ),
    )

    await session.generate_reply(
        instructions="Greet the user and offer your assistance."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)