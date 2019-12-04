import axios from 'axios'
export default {
  async getDouban(params) {
    let res = await axios.get("/api/j/search_subjects",{params})
    return res.data
  }
}
