import ytdl from "ytdl-core";
import { Readable } from "stream";


/**
 * ingests a Readable Stream and returns a concatenated Buffer from the received chunks.
 *
 * @param {Readable} stream a readable stream to be converted into a Buffer.
 * @returns {Promise<Buffer>} the buffer containing all the received chunk pieces.
 */
const streamToBuffer = async (stream:Readable):Promise<Buffer> =>  {
  const chunks:Buffer[] = []
  return new Promise<Buffer>((resolve, reject) => {
    stream.on("data", (chunk:Buffer) => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks)))
  })
}


/**
 * fetches the audio stream of a YouTube video online and returns a Base64 String representation.
 *
 * @param {string} [target] the YouTube Video url to fetch
 * @param {string} [quality] the desired audio quality [highestaudio/lowestaudio]
 * @returns
 */
const getVideoString = async (target?:string, quality?:string):Promise<string> => {
  return new Promise<string>( async (resolve, reject) => {
    const url = target || "https://www.youtube.com/watch?v=cAQVYXwiWi0"

    // Get the audio stream from the video site
    const audioStream = ytdl(url, {filter: "audioonly",quality})

    // Get the raw audio stream as a Buffer before converting to Base64
    const audioRaw = await streamToBuffer(audioStream)

    try {
      const base64data = "data:audio/wav;base64," + audioRaw.toString("base64");
      if (!base64data) {
        console.log(base64data.substr(0, 25));
        throw "Error with Bas64 Data"
      }
      return resolve(base64data);
    } catch (err) {
      reject(err)
    }
  })
  
}

export {getVideoString}


