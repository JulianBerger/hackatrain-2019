import axios from 'axios'

const URL = 'http://10.1.1.222:8080/'

export default {
	pull: () => {
		return axios.get(URL)
	}
}