import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../Templates/Layout';

import { selectUser } from '../../redux/slices/userSlice';

import EndSessionModal from './EndSessionModal';
import { selectMatch } from '../../redux/slices/matchSlice';
import { generateSessionId } from '../../utils';
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";

const chatSocket = io('http://localhost:3000');

function InterviewPage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const match = useSelector(selectMatch);
  const [show, setShow] = useState(false);
  const [sendingMsg, setSendingMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const sessionId = generateSessionId(user.email, match.email);
  useEffect(() => {
    chatSocket.on('connect', () =>
      setMessages((oldMessages) => [...oldMessages, {sender: 'System', msg: 'You are connected!'}])
    );
    chatSocket.on(sessionId, (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
      document.getElementById('chat-message-container').scrollTo(0, document.getElementById('chat-message-container').scrollHeight);
    });
  }, [sessionId]);
  if (!user) {
    history.push('/notauthorised');
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSend = () => {
    if (sendingMsg !== '') {
      chatSocket.emit('newMessage', {
        sessionId,
        payload: {
          sender: user['nickname'],
          msg: sendingMsg
        },
      });
      setSendingMsg('');
    }
  };

  return (
    <Layout>
      <div className="inner-flex-top vert-center-sm">
        <div className="main-50">
          <Card className="container fixed-bg-question">
            <CardContent>
              <h3 className="display-5 text-center">Question</h3>
              <p className="pt-3 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3>Chat</h3>
              {/* Chat UI */}
              <div className="chat-message-container" id="chat-message-container">
                {messages.map((m, i) => (
                  <div key={m.sender + m.msg + i} className={m.sender === user['nickname'] ? "chat-bubble-right" : "chat-bubble-left"}>
                    <Typography style={{textTransform: 'capitalize'}}>{m.sender}</Typography>
                    <Chip label={m.msg}/>
                  </div>
                ))}
              </div>
              <div className="chat-text-field">
                <TextField
                  fullWidth
                  value={sendingMsg}
                  type="text"
                  name="message"
                  placeholder="Message"
                  onChange={(e) => setSendingMsg(e.target.value)}
                  onKeyUp={e => e.key === 'Enter' ? handleSend() : null}
                />
                <Button
                  onClick={handleSend}
                  type="submit"
                  style={{ marginRight: '10px' }}
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="aside-50">
          <Card className="text-center">
            <CardContent>
              <h3 className="display-5 mb-4">Collaborative NotePad</h3>
              <form>
                <textarea className="form-control textarea-minheight" rows="20" />
              </form>
            </CardContent>
          </Card>

          <div className="div-right">
            <div className="div-right-adjust-5">
              <Button
                variant="contained"
                color="secondary"
                className="mt-5 pp-button"
                onClick={handleShow}
              >
                End Session
              </Button>
            </div>
          </div>
        </div>
        <EndSessionModal handleClose={handleClose} show={show} />{' '}
      </div>
    </Layout>
  );
}

export default InterviewPage;
