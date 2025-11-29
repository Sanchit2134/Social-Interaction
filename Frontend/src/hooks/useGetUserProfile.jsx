import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserProfile } from '@/redux/AuthSlice';

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchdUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, {withCredentials: true});
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
