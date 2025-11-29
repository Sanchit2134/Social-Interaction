import { setPost } from '@/redux/PostSlice'
import api from '@/lib/api'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await api.get('/api/v1/post/all');
                if (res.data.success) { 
                    console.log(res.data.posts);
                    dispatch(setPost(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};

export default useGetAllPost