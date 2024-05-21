import React, { useState, useEffect } from 'react';
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
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { map } from 'lodash';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import withAuthProtection from '../components/Common/withAuthProtection';
import avatar from '../../public/images/users/user-dummy-img.jpg';
import BreadCrumb from '../components/Common/BreadCrumb';
import chatThunk from '../slices/chat/thunk';

function Chat() {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.Auth?.user);
  const chat = useSelector(state => state?.Chat?.chat);
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState('Virtual Assistant');
  const [messageBox, setMessageBox] = useState(null);
  const [curMessage, setcurMessage] = useState('');
  const [search_Menu, setsearch_Menu] = useState(false);
  const [reply, setreply] = useState('');
  const messages = [
    {
      id: 1,
      createdAt: '09:07 am',
      message: 'Good morning 😊',
      // roomId: 1,
      sender: 'Lisa Parker',
    },
    {
      id: 2,
      createdAt: '09:08 am',
      message: 'Good morning, How are you? What about our next meeting?',
      // roomId: 1,
      sender: 'Anna Adame',
    },
    {
      id: 3,
      createdAt: '09:10 am',
      message: 'Yeah everything is fine. Our next meeting tomorrow at 10.00 AM',
      roomId: 1,
      sender: 'Lisa Parker',
    },
    {
      // id: 4,
      createdAt: '09:10 am',
      message:
        "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.",
      roomId: 1,
      sender: 'Lisa Parker',
    },
    {
      createdAt: '09:12 am',
      message: "Wow that's great",
      roomId: 1,
      sender: 'Anna Adame',
    },
  ];

  useEffect(() => {
    dispatch(chatThunk.getChat({ id: user?._id }));
  }, []);

  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const addMessage = (roomId, sender) => {
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date(),
    };
    setcurMessage('');
    dispatch(onAddMessage(message));
  };

  const onKeyPress = e => {
    const { key, value } = e;
    if (key === 'Enter') {
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
    }
  };

  const searchMessages = () => {
    let searchInput;
    let searchFilter;
    let searchUL;
    let searchLI;
    let a;
    let txtValue;
    searchInput = document.getElementById('searchMessage');
    searchFilter = searchInput.value.toUpperCase();
    searchUL = document.getElementById('users-conversation');
    searchLI = searchUL.getElementsByTagName('li');
    Array.prototype.forEach.call(searchLI, search => {
      a = search.getElementsByTagName('p')[0] ? search.getElementsByTagName('p')[0] : '';
      txtValue = a.textContent || a.innerText ? a.textContent || a.innerText : '';
      if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
        search.style.display = '';
      } else {
        search.style.display = 'none';
      }
    });
  };
  return (
    <>
      <div className="page-content">
        <BreadCrumb title="Chat" />
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
                                  {Chat_Box_Image === undefined ? (
                                    <img src={userDummayImage} className="rounded-circle avatar-xs" alt="" />
                                  ) : (
                                    <img src={Chat_Box_Image} className="rounded-circle avatar-xs" alt="" />
                                  )}
                                  <span className="user-status" />
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
                                  <DropdownItem href="#" className="d-block d-lg-none user-profile-show">
                                    <i className="ri-user-2-fill align-bottom text-muted me-2" /> View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    <i className="ri-inbox-archive-line align-bottom text-muted me-2" /> Archive
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    <i className="ri-mic-off-line align-bottom text-muted me-2" /> Muted
                                  </DropdownItem>
                                  <DropdownItem href="#">
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
                          {chat &&
                            map(chat, (message, key) => (
                              <li
                                className={message.sender === Chat_Box_Username ? ' chat-list left' : 'chat-list right'}
                                key={key}>
                                <div className="conversation-list">
                                  {message.sender === Chat_Box_Username && (
                                    <div className="chat-avatar">
                                      {Chat_Box_Image === undefined ? (
                                        <img src={userDummayImage} alt="" />
                                      ) : (
                                        <img src={Chat_Box_Image} alt="" />
                                      )}
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
                                          <DropdownItem
                                            href="#"
                                            className="reply-message"
                                            onClick={() => setreply(message)}>
                                            <i className="ri-reply-line me-2 text-muted align-bottom" />
                                            Reply
                                          </DropdownItem>
                                          <DropdownItem href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom" />
                                            Forward
                                          </DropdownItem>
                                          <DropdownItem href="#" onClick={e => handleCkick(e.target)}>
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom" />
                                            Copy
                                          </DropdownItem>
                                          <DropdownItem href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom" />
                                            Bookmark
                                          </DropdownItem>
                                          <DropdownItem href="#" onClick={() => dispatch(onDeleteMessage(message.id))}>
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom" />
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </div>
                                    <div className="conversation-name">
                                      <small className="text-muted time">09:07 am</small>{' '}
                                      <span className="text-success check-message-icon">
                                        <i className="ri-check-double-line align-bottom" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
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
                                  color="info"
                                  onClick={() => {
                                    addMessage(currentRoomId, currentUser.name);
                                    setemojiPicker(false);
                                    setemojiArray('');
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
    </>
  );
}

export default withAuthProtection(Chat);
