import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../Templates/Layout';

import { selectUser } from '../../redux/slices/userSlice';

import EndSessionModal from './EndSessionModal';
import { selectMatch } from '../../redux/slices/matchSlice';
import { generateSessionId } from '../../utils';

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
      setMessages((oldMessages) => [...oldMessages, 'You are connected!'])
    );
    chatSocket.on(sessionId, (message) =>
      setMessages((oldMessages) => [...oldMessages, message])
    );
  }, [sessionId]);
  if (!user) {
    history.push('/notauthorised');
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <Layout>
      <div className="inner-flex-top vert-center-sm">
        <div className="main-50">
          <div className="container fixed-bg-question">
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
          </div>

          <div className="container fixed-bg-chat">
            <h3 className="display-5 text-center">Chat (Placeholder)</h3>
            {/* Chat UI */}
            {messages.map((m) => (
              <span key={m}>{m}</span>
            ))}
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="handle">
                <Form.Control
                  type="text"
                  name="message"
                  placeholder="Message"
                  onChange={(e) => setSendingMsg(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Button
              onClick={() =>
                chatSocket.emit('newMessage', {
                  sessionId,
                  msg: sendingMsg,
                })
              }
              type="submit"
              style={{ marginRight: '10px' }}
            >
              Send
            </Button>
          </div>
        </div>
        <div className="aside-50">
          <div className="container fixed-bg-2 text-center">
            <h3 className="display-5 mb-4">Collaborative NotePad</h3>
            <form>
              <textarea className="form-control textarea-minheight" rows="20" />
            </form>
          </div>

          <div className="div-right">
            <div className="div-right-adjust-5">
              <Button
                variant="primary"
                size="lg"
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
