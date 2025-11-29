import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '@/lib/api';
import { setSuggestedUser } from '@/redux/AuthSlice';

const useGetSuggestedUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await api.get('/api/v1/user/suggested');
                if (res.data.success) { 
                    dispatch(setSuggestedUser(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    }, []);
};

export default useGetSuggestedUser;