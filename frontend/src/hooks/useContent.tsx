import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);
    function refresh() {
        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })
    }

    useEffect(() => { //We can't use async await here ,so that's why we are using .then
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])
    return { contents, refresh };
}