import { setMessages } from '@/redux/chatSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllMessage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(store=>store.auth);
    useEffect(()=>{
        if (!selectedUser?._id) {
            dispatch(setMessages([]));
            return;
        }
        
        const fetchAllMessages = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser._id}`, {withCredentials: true});
                if(res.data.success){
                    const messages = res.data.messages || [];
                    console.log('Fetched messages:', messages);
                    dispatch(setMessages(messages));
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                dispatch(setMessages([]));
            }
        }
        fetchAllMessages(); 
    },[selectedUser, dispatch])
}

export default useGetAllMessage;