import axios from 'axios';
import { browserHistory } from 'react-router';

export const CREATE_ROOM = 'CREATE_ROOM';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

// takes in an object containing FB_id, message, bonfireId and optionally chatId
// example: 
// data = {
//   bonfireId: bonfireId,
//   message: "Some eloquently written string",
//   FB_id: FB_id,
//   (optional)
//   Chats_id: chatId
// }

export function addMessage(data) {
  const add = axios.post('/chat/' + data.bonfireId, data);

  return (dispatch) => {
    return add
      .then((response) => {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            messageData: data
          }
        })
      })
  }
}

export function getMessages(bonId) {
  const getAll = axios.get('/chat/' + bonId);

  return (dispatch) => {
    return getAll
      .then((response) => {
      console.log('hsdskjfbsdkjsdf')
        dispatch({
          type: GET_MESSAGES,
          payload: {
            messages: response.data
          }
        })
    browserHistory.push('/ChatPage/' + bonId);
      })
  }
}