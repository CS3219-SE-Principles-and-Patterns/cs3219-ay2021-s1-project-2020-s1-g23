import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { generateSessionId } from '../../utils';
import EndSessionModal from './EndSessionModal';
import { selectMatch } from '../../redux/slices/matchSlice';
import { selectUser } from '../../redux/slices/userSlice';
import Layout from '../../Templates/Layout';

const editorSocket = io('https://api.peerprep.live/editor', {
  path: '/editor/new',
  forceNew: true,
});
const chatSocket = io('https://api.peerprep.live/chat', {
  path: '/chat/new',
  forceNew: true,
});

const useStyles = makeStyles({
  chatMessageContainer: {
    overflowY: 'auto',
    flexGrow: 1,
    minHeight: 0,
  },
  interviewContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: '64px 0',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

function InterviewPage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const match = useSelector(selectMatch);
  const [show, setShow] = useState(false);
  const [sendingMsg, setSendingMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState();
  const [question, setQuestion] = useState({});
  const classes = useStyles();
  const sessionId = generateSessionId(user.email, match.email);
  useEffect(() => {
    chatSocket.on('connect', () =>
      setMessages((oldMessages) => [
        ...oldMessages,
        { sender: 'System', msg: 'You are connected!' },
      ])
    );
    chatSocket.on(sessionId, (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
      const msgContainer = document.getElementById('chat-message-container');
      msgContainer.scrollTo(0, msgContainer.scrollHeight);
    });
    editorSocket.on('Question', (qn, input, output) => {
      setQuestion({ qn, input, output });
    });
    editorSocket.on(sessionId, (data) => {
      console.log(`Receiving: ${data}`);
      setCode(data);
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
          sender: user.nickname,
          msg: sendingMsg,
        },
      });
      setSendingMsg('');
    }
  };

  // Editor
  const handleTextChange = (event) => {
    editorSocket.emit('newMessage', {
      sessionId,
      payload: event.target.value,
    });
  };

  return (
    <Layout>
      <Container style={{ display: 'flex', height: 'calc(100vh - 77px)' }}>
        <div className={classes.interviewContent}>
          <div className={classes.leftPanel}>
            <Card style={{ display: 'flex', flex: 1 }}>
              <CardContent
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
              >
                <h3>Collaborative NotePad</h3>
                <form style={{ display: 'flex', flex: 1 }}>
                  <textarea
                    className="form-control textarea-minheight"
                    rows="20"
                    value={code}
                    onChange={handleTextChange}
                  />
                </form>
              </CardContent>
            </Card>
          </div>
          <div style={{ width: 32 }} />
          <div className={classes.rightPanel}>
            <Card style={{ display: 'flex', flex: 1, margin: '16px 0' }}>
              <CardContent
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
              >
                <div className={classes.chatMessageContainer}>
                  <h3>Question</h3>
                  <p className="pt-3 text-left">{question.qn}</p>
                  <p className="pt-3 text-left">{question.input}</p>
                  <p className="pt-3 text-left">{question.output}</p>
                </div>
              </CardContent>
            </Card>
            <Card style={{ display: 'flex', flex: 1, margin: '32px 0' }}>
              <CardContent
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
              >
                <h3>Chat</h3>
                <div
                  className={classes.chatMessageContainer}
                  id="chat-message-container"
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={
                        m.sender === user.nickname
                          ? 'chat-bubble-right'
                          : 'chat-bubble-left'
                      }
                    >
                      <Typography
                        variant="caption"
                        style={{ textTransform: 'capitalize' }}
                        color="textSecondary"
                      >
                        {m.sender}
                      </Typography>
                      <Chip label={m.msg} />
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
                    onKeyUp={(e) => (e.key === 'Enter' ? handleSend() : null)}
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
            <Button variant="contained" color="secondary" onClick={handleShow}>
              End Session
            </Button>
          </div>
        </div>
        <EndSessionModal handleClose={handleClose} show={show} />{' '}
      </Container>
    </Layout>
  );
}

export default InterviewPage;
