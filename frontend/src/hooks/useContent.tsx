import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export function useContent(type?: string) {
    const [contents, setContents] = useState([]);

    function refresh() {
        let url = type ? `${BACKEND_URL}/content/${type}` : `${BACKEND_URL}/content`;
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })

            .catch(console.error);
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval);
    }, [type]);


    return { contents, refresh };
}