import {ENDPOINT} from "../../API";

const uploadFile = async (file) => {
    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("media", file);
    try {
        const result = await fetch(`${ENDPOINT}/upload`, {
            method: "POST",
            headers: token
                ? {Authorization: "Bearer " + token}
                : {},
            body: formData
        })
        const json = await result.json();
        console.log("UPLOAD RESULT", json);
        return json
    }
    catch(e){
        console.log(e)
    }
}

export default uploadFile