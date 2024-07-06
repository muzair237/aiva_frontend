import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Card,
  CardBody,
  Button,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import useSound from 'use-sound';
import { isEmpty, map } from 'lodash';
import FeatherIcon from 'feather-icons-react';
import { format } from 'date-fns';
import withAuthProtection from '../components/Common/withAuthProtection';
import avatar from '../../public/images/chatbot.png';
import chatThunk from '../slices/chat/thunk';
import messageSent from '../../public/audio/messageSent.mp3';
import messageReceived from '../../public/audio/messageReceived.mp3';
import MessageLoader from '../components/Molecules/MessageLoader';
import { Toast } from '../components/Molecules/Toast';
import DeleteModal from '../components/Molecules/DeleteModal';

function Chat() {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.Auth?.user);
  const userChat = useSelector(state => state?.Chat?.chat);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(userChat);
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [Chat_Box_Image] = useState(avatar);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [Chat_Box_Username] = useState('Virtual Assistant');
  const [messageBox, setMessageBox] = useState(null);
  const [curMessage, setcurMessage] = useState('');
  const [search_Menu, setsearch_Menu] = useState(false);
  const [reply, setreply] = useState('');
  const [messageSentSound] = useSound(messageSent, { volume: 0.8 });
  const [messageReceivedSound] = useSound(messageReceived, { volume: 0.8 });
  const [originalChat, setOriginalChat] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState();
  const [deleteMessage, setdeleteMessage] = useState('');

  useEffect(() => {
    dispatch(chatThunk.getChat({ id: user?._id }));
  }, []);

  useEffect(() => {
    setChat(userChat);
    setOriginalChat(userChat);
  }, [userChat]);

  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const addMessage = async () => {
    setcurMessage('');
    messageSentSound();
    setChat(prev => [
      ...prev,
      {
        id: prev.length + 1,
        roomId: 1,
        timeStamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        message: curMessage,
        sender: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
      },
    ]);
    setOriginalChat(prev => [
      ...prev,
      {
        id: prev.length + 1,
        roomId: 1,
        timeStamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        message: curMessage,
        sender: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
      },
    ]);
    // Adding message to chat
    setIsLoading(true); // Set isLoading to true to display loader
    try {
      // Simulate an asynchronous operation (API call or any other async task)
      await new Promise(resolve => setTimeout(resolve, 2500));
      const payload = {
        query: curMessage,
      };
      const resultAction = await dispatch(chatThunk.askQuery({ payload }));
      messageReceivedSound();
      setChat(prev => [...prev.slice(0, -1), resultAction.payload.message, resultAction.payload.response]);

      // console.log(resultAction.payload.response);
      setOriginalChat(prev => [...prev, resultAction.payload.message, resultAction.payload.response]);
    } finally {
      setIsLoading(false); // After async operation completes, set isLoading back to false
    }
  };

  const deleteMessagef = async () => {
    const res = await dispatch(chatThunk.deleteMessage({ messageToDelete }));
    if (res?.payload?.success) {
      setChat(prev => prev.filter(message => message._id !== messageToDelete));
      setOriginalChat(prev => prev.filter(message => message._id !== messageToDelete));
      setDeleteModal(false);
    }
  };
  const deleteChat = async () => {
    const res = await dispatch(chatThunk.deleteChat({ id: user?._id }));
    if (res?.payload?.success) {
      setChat([]);
      setOriginalChat([]);
      setDeleteModal(false);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if (!isEmpty(chat)) scrollToBottom();
  }, [chat, scrollToBottom]);

  const onKeyPress = e => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      addMessage();
    }
  };

  const searchMessages = () => {
    const searchInput = document.getElementById('searchMessage');
    // if (!searchInput.value) return;

    const searchFilter = searchInput.value.toUpperCase();

    if (searchFilter === '') {
      setChat(originalChat);
    } else {
      const filteredChat = originalChat.filter(message => message.message.toUpperCase().includes(searchFilter));
      setChat(filteredChat);
    }
  };

  return (
    <>
      <Head>
        <title>WebNova | CHAT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="user-chat w-100 overflow-hidden">
              <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                  <div className="position-relative">
                    <div className="p-3 user-chat-topbar">
                      <Row className="align-items-center">
                        <Col sm={4} xs={8}>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 d-block d-lg-none me-3">
                              <Link href="#" className="user-chat-remove fs-18 p-1">
                                <i className="ri-arrow-left-s-line align-bottom" />
                              </Link>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                  <Image
                                    src={Chat_Box_Image}
                                    width={45}
                                    height={43}
                                    className="rounded-circle"
                                    alt=""
                                  />
                                  <span style={{ backgroundColor: 'success' }} className="user-status" />
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <h5 className="text-truncate mb-0 fs-16">
                                    <a
                                      className="text-reset username"
                                      data-bs-toggle="offcanvas"
                                      href="#userProfileCanvasExample"
                                      aria-controls="userProfileCanvasExample">
                                      {Chat_Box_Username}
                                    </a>
                                  </h5>
                                  <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                    <small>Online</small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={8} xs={4}>
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item m-0">
                              <Dropdown isOpen={search_Menu} toggle={toggleSearch}>
                                <DropdownToggle className="btn btn-ghost-secondary btn-icon" tag="button">
                                  <FeatherIcon icon="search" className="icon-sm" />
                                </DropdownToggle>
                                <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                  <div className="p-2">
                                    <div className="search-box">
                                      <Input
                                        onKeyUp={searchMessages}
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder="Search here..."
                                        id="searchMessage"
                                        autoFocus
                                      />
                                      <i className="ri-search-2-line search-icon" />
                                    </div>
                                  </div>
                                </DropdownMenu>
                              </Dropdown>
                            </li>

                            <li className="list-inline-item d-none d-lg-inline-block m-0">
                              <button type="button" className="btn btn-ghost-secondary btn-icon" onClick={toggleInfo}>
                                <FeatherIcon icon="info" className="icon-sm" />
                              </button>
                            </li>

                            <li className="list-inline-item m-0">
                              <Dropdown isOpen={settings_Menu} toggle={toggleSettings}>
                                <DropdownToggle className="btn btn-ghost-secondary btn-icon" tag="button">
                                  <FeatherIcon icon="more-vertical" className="icon-sm" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem href="#">
                                    {' '}
                                    <i className="ri-user-fill align-bottom text-muted me-2" /> View Profile
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      setDeleteModal(true);
                                      setdeleteMessage('Chat');
                                    }}>
                                    {' '}
                                    <i className="ri-delete-bin-5-line align-bottom text-muted me-2" /> Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div className="position-relative" id="users-chat">
                      <PerfectScrollbar
                        className="chat-conversation p-3 p-lg-4"
                        id="chat-conversation"
                        containerRef={ref => setMessageBox(ref)}>
                        <div id="elmLoader" />
                        <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                          {chat && chat?.length > 0 ? (
                            map(chat, (message, key) => (
                              <li
                                className={
                                  message?.sender === Chat_Box_Username ? ' chat-list left' : 'chat-list right'
                                }
                                key={key}>
                                <div className="conversation-list">
                                  {message?.sender === Chat_Box_Username && (
                                    <div className="chat-avatar">
                                      <Image src={Chat_Box_Image} alt="" />
                                    </div>
                                  )}

                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div className="ctext-wrap-content">
                                        <p className="mb-0 ctext-content">{message.message}</p>
                                      </div>
                                      <UncontrolledDropdown className="align-self-start message-box-drop">
                                        <DropdownToggle href="#" className="btn nav-btn" tag="i">
                                          <i className="ri-more-2-fill" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          {/* <DropdownItem
                                            href="#"
                                            className="reply-message"
                                            onClick={() => setreply(message)}>
                                            <i className="ri-reply-line me-2 text-muted align-bottom" />
                                            Reply
                                          </DropdownItem> */}
                                          <DropdownItem
                                            href="#"
                                            onClick={() => {
                                              navigator.clipboard.writeText(message?.message);
                                              Toast({
                                                type: 'success',
                                                message: 'Message Copied to Clipboard!',
                                              });
                                            }}>
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom" />
                                            Copy
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              setDeleteModal(true);
                                              setMessageToDelete(message?._id);
                                              setdeleteMessage('Message');
                                              // deleteMessage(message?._id)
                                            }}>
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom" />
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </div>
                                    {/* <div className="conversation-name">
                                      <small className="text-muted time">{message?.timeStamp}</small>{' '}
                                      <span className="text-primary check-message-icon">
                                        <i className="ri-check-double-line align-bottom" />
                                      </span>
                                    </div> */}
                                    <div className="message-date">
                                      <small className="text-muted">
                                        {format(new Date(message.createdAt), 'dd MMM yyyy, h:mm a')}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="no-messages">
                              <div className="no-messages-content">
                                <h2>No messages yet. Start the conversation now!</h2>
                              </div>
                            </li>
                          )}
                          {isLoading && (
                            <li className="chat-list left">
                              <MessageLoader />
                            </li>
                          )}
                        </ul>
                      </PerfectScrollbar>
                      <div
                        className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                        id="copyClipBoard"
                        role="alert">
                        Message copied
                      </div>
                    </div>

                    <div className="chat-input-section p-3 p-lg-4">
                      <form id="chatinput-form">
                        <Row className="g-0 align-items-center">
                          <div className="col">
                            <div className="chat-input-feedback">Please Enter a Message</div>
                            <input
                              type="text"
                              value={curMessage}
                              onKeyPress={onKeyPress}
                              onChange={e => setcurMessage(e.target.value)}
                              className="form-control chat-input bg-light border-light"
                              id="chat-input"
                              placeholder="Type your message..."
                            />
                          </div>
                          <div className="col-auto">
                            <div className="chat-input-links ms-2">
                              <div className="links-list-item">
                                <Button
                                  type="button"
                                  color="primary"
                                  disabled={!curMessage}
                                  onClick={() => {
                                    addMessage();
                                    // setemojiPicker(false);
                                    // setemojiArray('');
                                  }}
                                  className="chat-send waves-effect waves-light">
                                  <i className="ri-send-plane-2-fill align-bottom" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </form>
                    </div>

                    <div className={reply ? 'replyCard show' : 'replyCard'}>
                      <Card className="mb-0">
                        <CardBody className="py-3">
                          <div className="replymessage-block mb-0 d-flex align-items-start">
                            <div className="flex-grow-1">
                              <h5 className="conversation-name">{reply && reply.sender}</h5>
                              <p className="mb-0">{reply && reply.message}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                type="button"
                                id="close_toggle"
                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                onClick={() => setreply('')}>
                                <i className="bx bx-x align-middle" />
                              </button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          handleClick={deleteMessage === 'Message' ? deleteMessagef : deleteChat}
          message={`Are you sure you Want to Delete this ${deleteMessage}? This action cannot be undone.`}
        />
      )}
    </>
  );
}

export default withAuthProtection(Chat);
