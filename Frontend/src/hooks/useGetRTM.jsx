import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '@/redux/chatSlice'

const useGetRTM = () => {
    const dispatch = useDispatch()
    const socket = useSelector(store=>store.socketio?.socket);
    const {selectedUser, user} = useSelector(store=>store.auth);
    
    useEffect(()=>{
        if (!socket) return;
        
        const handleNewMessage = (newMessage) => {
            // Convert ObjectIds to strings for comparison
            const senderIdStr = newMessage.senderId?.toString ? newMessage.senderId.toString() : newMessage.senderId;
            const receiverIdStr = newMessage.receiverId?.toString ? newMessage.receiverId.toString() : newMessage.receiverId;
            const userIdStr = user?._id?.toString ? user._id.toString() : user?._id;
            const selectedUserIdStr = selectedUser?._id?.toString ? selectedUser._id.toString() : selectedUser?._id;
            
            // Only add message if it's part of the current conversation
            if (selectedUser && user) {
                const isCurrentConversation = 
                    (senderIdStr === userIdStr && receiverIdStr === selectedUserIdStr) ||
                    (senderIdStr === selectedUserIdStr && receiverIdStr === userIdStr);
                
                if (isCurrentConversation) {
                    dispatch(addMessage(newMessage));
                }
            } else if (!selectedUser && user) {
                // If no user is selected, still store the message in case user opens that conversation later
                // But for now, we'll only add if there's a selected user to avoid clutter
                // Actually, let's not add it if no user is selected
            }
        };
        
        socket.on('newMessage', handleNewMessage);
        
        return ()=>{
            socket.off('newMessage', handleNewMessage);
        }
    },[socket, dispatch, selectedUser, user])
}

export default useGetRTM;