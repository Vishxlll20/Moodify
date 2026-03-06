import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [ song, setSong ] = useState({
        "url": "https://ik.imagekit.io/hczwjvgaho/cohort-2/moodify/songs/Barbaad_-_PagalNew_ppWWtQ8lH.mp3",
        "posterUrl": "https://ik.imagekit.io/hczwjvgaho/cohort-2/moodify/posters/Barbaad_-_PagalNew_ScKecsucV.jpeg",
        "title": "Barbaad",
        "mood": "sad",
    })

    const [ loading, setLoading ] = useState(false)

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )

}