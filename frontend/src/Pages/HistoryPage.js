import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectUser } from '../redux/slices/userSlice';
import { API_HOST } from '../consts';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function HistoryPage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`${API_HOST}/user/profile/${user._id}`)
        .then((response) => response.json())
        .then((result) => setInterviews(result.data.interviews));
    }
  }, [user]);
  if (!user) {
    history.push('/notauthorised');
  }
  return (
    <Paper style={{ maxHeight: 384 }}>
      {interviews.length === 0 ? (
        <h5 className="pt-5 pb-5 text-center">
          It is so empty over here... Start PeerPrepping!
        </h5>
      ) : (
        <List color="primary" style={{ maxHeight: 384, overflowY: 'scroll' }}>
          {interviews.map((intv, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`PeerPrepped with ${intv.partner_nickname}!`}
                secondary={`From ${moment(intv.start).format(
                  'DD MMM YYYY, h:mm a'
                )} to ${moment(intv.end).format('DD MMM YYYY, h:mm a')}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default HistoryPage;
