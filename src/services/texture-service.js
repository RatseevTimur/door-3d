import axios from "axios";
export const API_MAIN_URL = `${process.env.REACT_APP_BACK_PROTOCOL}://${process.env.REACT_APP_BACK_DOMAIN}/`;

export const OPTIONS_DEFAULT = {
	headers: {
		// 'Session-Key': sessionCookie,
		// 'Domain': domain,
		'Content-Type': 'application/json',
	},
	// method: 'POST',
};

export const textureService = (itemId) => {
    console.log("itemId", itemId)
    return axios.post(API_MAIN_URL + 'invent/item/'+ itemId, {}, OPTIONS_DEFAULT)
        .then((resp)=>{
            console.log(resp)
            return resp.data
        })
        .catch((error)=>{
            console.log(error)
        })
}

// const { data, error } = useFetch(API_MAIN_URL + 'invent/item/' + itemId, OPTIONS_DEFAULT, {skip: !itemId});
