import axios from 'axios'
import { 
    csrfToken 
} from '@rails/ujs'

axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken()

export default axios 
