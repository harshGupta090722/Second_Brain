import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    useEffect(() => { //We can't use async await here ,so that's why we are using .then
        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })
    }, [])
    console.log(contents);
    return contents;
}