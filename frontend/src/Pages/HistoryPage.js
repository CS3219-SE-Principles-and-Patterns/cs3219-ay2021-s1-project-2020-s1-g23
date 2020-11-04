import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Layout from '../Templates/Layout';

import { selectUser } from '../redux/slices/userSlice';
import { API_HOST } from '../consts';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

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
  }, []);
  if (!user) {
    history.push('/notauthorised');
  }
  return (
    <Layout>
      <div className="container">
        <Link to="/">
          <Button variant="primary" size="lg" className="mt-5 pp-button">
            Back
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="display-4 mt-5">History</h1>
          <h3 className="pt-3 font-italic">View your past PeerPreps here!</h3>
        </div>

        <div className="container fixed-bg-history pp-box-deco pad-tb-75">
          {interviews.length === 0 ? (
            <h5 className="pt-5 pb-5 text-center">
              It is so empty over here... Start PeerPrepping!
            </h5>
          ) : (
            <List>
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
        </div>
      </div>
    </Layout>
  );
}

export default HistoryPage;
