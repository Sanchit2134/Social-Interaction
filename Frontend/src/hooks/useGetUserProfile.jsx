import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '@/lib/api';
import { setUserProfile } from '@/redux/AuthSlice';

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchdUserProfile = async () => {
            try {
                const response = await api.get(`/api/v1/user/${userId}/profile`);
                if(response.data.success){
                    dispatch(setUserProfile(response.data.user)); 
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchdUserProfile();
    },[userId])
};

export default useGetUserProfile;
