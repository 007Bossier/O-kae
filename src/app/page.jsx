"use client";
import React, { useState, useRef } from "react"; // Combine all React imports here

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();
  const [newUpdate, setNewUpdate] = useState("");
  const [statusImage, setStatusImage] = useState(null);
  const [statusVisibility, setStatusVisibility] = useState("public");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [locationPrivacy, setLocationPrivacy] = useState("friends");
  const [swipedChat, setSwipedChat] = useState(null);
  const [swipeStart, setSwipeStart] = useState(null);
  const [showMickeyStatus, setShowMickeyStatus] = useState(false);
  const [viewedStories, setViewedStories] = useState(new Set());
  const [activeMomentsTab, setActiveMomentsTab] = useState("posts");
  const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Weekend Braai",
      host: "Zi Ndebele",
      date: "2025-03-15",
      time: "14:00",
      location: "Gaborone Yacht Club",
      description: "Join us for a relaxing afternoon braai by the water 🍖",
      attendees: 15,
      image:
        "https://ucarecdn.com/874df9a2-90b9-4505-8213-e303e1a0971b/-/format/auto/",
      rsvp: "maybe",
    },
    {
      id: 2,
      title: "Tech Meetup",
      host: "Given Hlongwane",
      date: "2025-03-20",
      time: "18:00",
      location: "Innovation Hub",
      description: "Let's discuss the latest in web development! 💻",
      attendees: 32,
      image:
        "https://ucarecdn.com/c3d75418-e1a4-409b-bbdd-02088e08f079/-/format/auto/",
      rsvp: "going",
    },
  ]);
  const [chatMessages, setChatMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: "Hey! How are you?",
        timestamp: "10:30 AM",
        status: "read",
      },
      {
        id: 2,
        senderId: 2,
        text: "I'm good, thanks! Just working on some projects.",
        timestamp: "10:31 AM",
        status: "sent",
      },
    ],
  });
  const [messageStatus, setMessageStatus] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [nearbyFriends, setNearbyFriends] = useState([
    {
      id: 1,
      name: "Mickey",
      distance: "0.5km away",
      lat: -24.6282,
      lng: 25.9231,
      status: "Just finished a great workout! 💪",
      time: "5m ago",
      image:
        "https://ucarecdn.com/3f76c476-fc08-4428-a54d-9692b2e5fed4/-/format/auto/",
    },
    {
      id: 2,
      name: "Lolah",
      distance: "1.2km away",
      lat: -24.6382,
      lng: 25.9131,
      image: "/avatar3.jpg",
    },
    {
      id: 3,
      name: "Urus",
      distance: "2.5km away",
      lat: -24.6482,
      lng: 25.9331,
      image:
        "https://ucarecdn.com/93b78714-6d75-4aaa-be4f-ab38107aed8c/-/format/auto/",
    },
  ]);
  const [moments, setMoments] = useState([
    {
      id: 1,
      user: "Zi Ndebele",
      content: "At the mall! 🛍️",
      image: null,
      visibility: "public",
      time: "1h ago",
      likes: 12,
      mentions: [],
    },
    {
      id: 2,
      user: "Given Hlongwane",
      content: "Beautiful sunset in Gaborone 🌅",
      image: null,
      visibility: "friends",
      time: "2h ago",
      likes: 24,
      mentions: ["@zi_ndebele"],
    },
    {
      id: 3,
      user: "Bakang Mookodi",
      content: "Game drive at Madikwe 🦁",
      image: null,
      visibility: "public",
      time: "3h ago",
      likes: 45,
      mentions: [],
    },
  ]);
  const [notification, setNotification] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const notificationRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState(null);
  const [currentCallUser, setCurrentCallUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showCallLogs, setShowCallLogs] = useState(false);
  const [callLogs, setCallLogs] = useState([
    {
      id: 1,
      name: "Zi Ndebele",
      type: "incoming",
      status: "success",
      time: "10:30 AM",
      date: "Today",
      duration: "5:23",
      image:
        "https://ucarecdn.com/874df9a2-90b9-4505-8213-e303e1a0971b/-/format/auto/",
    },
    {
      id: 2,
      name: "Given Hlongwane",
      type: "outgoing",
      status: "success",
      time: "Yesterday",
      date: "Yesterday",
      duration: "2:45",
      image:
        "https://ucarecdn.com/c3d75418-e1a4-409b-bbdd-02088e08f079/-/format/auto/",
    },
    {
      id: 3,
      name: "Bakang Mookodi",
      type: "missed",
      status: "missed",
      time: "Yesterday",
      date: "Yesterday",
      duration: null,
      image:
        "https://ucarecdn.com/d9166dab-0e6a-48ee-9c29-da6f7f742e69/-/format/auto/",
    },
    {
      id: 4,
      name: "Mickey",
      type: "incoming",
      status: "success",
      time: "2 days ago",
      date: "2 days ago",
      duration: "15:42",
      image:
        "https://ucarecdn.com/3f76c476-fc08-4428-a54d-9692b2e5fed4/-/format/auto/",
    },
    {
      id: 5,
      name: "Lolah",
      type: "outgoing",
      status: "success",
      time: "2 days ago",
      date: "2 days ago",
      duration: "3:15",
      image: "/avatar3.jpg",
    },
    {
      id: 6,
      name: "Urus",
      type: "missed",
      status: "missed",
      time: "3 days ago",
      date: "3 days ago",
      duration: null,
      image:
        "https://ucarecdn.com/93b78714-6d75-4aaa-be4f-ab38107aed8c/-/format/auto/",
    },
  ]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [showAttachments, setShowAttachments] = useState(false);
  const [reelAutoPlay, setReelAutoPlay] = useState(true);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels, setReels] = useState([
    {
      id: 1,
      user: "Zi Ndebele",
      content: "Weekend vibes at the mall! 🛍️",
      media:
        "https://ucarecdn.com/874df9a2-90b9-4505-8213-e303e1a0971b/-/format/auto/",
      likes: 234,
      comments: 45,
      shares: 12,
    },
    {
      id: 2,
      user: "Given Hlongwane",
      content: "Sunset in Gaborone is always magical 🌅",
      media:
        "https://ucarecdn.com/c3d75418-e1a4-409b-bbdd-02088e08f079/-/format/auto/",
      likes: 567,
      comments: 89,
      shares: 23,
    },
    {
      id: 3,
      user: "Bakang Mookodi",
      content: "Safari adventures! 🦁",
      media:
        "https://ucarecdn.com/d9166dab-0e6a-48ee-9c29-da6f7f742e69/-/format/auto/",
      likes: 789,
      comments: 120,
      shares: 45,
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiInputMessage, setAiInputMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm O'kae AI Assistant. How can I help you today?",
    },
  ]);
  const handleAiMessageSubmit = () => {
    if (aiInputMessage.trim()) {
      const newMessage = {
        id: aiMessages.length + 1,
        role: "user",
        content: aiInputMessage,
      };
      setAiMessages((prev) => [...prev, newMessage]);
      setAiInputMessage("");
      setIsAiTyping(true);

      setTimeout(() => {
        const aiResponse = {
          id: aiMessages.length + 2,
          role: "assistant",
          content:
            "I'm simulating an AI response. In a real app, this would be an actual response from an AI model.",
        };
        setAiMessages((prev) => [...prev, aiResponse]);
        setIsAiTyping(false);
      }, 1000);
    }
  };
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 8,
      name: "Thato Kgosi",
      phone: "+27713122889",
      image:
        "https://ucarecdn.com/b9c7e8ac-b2ac-4614-8a34-4d56686f358c/-/format/auto/",
      status: "Available",
    },
    {
      id: 9,
      name: "Lesego Moloi",
      phone: "+27713122890",
      image:
        "https://ucarecdn.com/1d5e5f1c-6a5f-4523-b0f5-3c3a69245c5c/-/format/auto/",
      status: "At work",
    },
    {
      id: 10,
      name: "Kgomotso Tau",
      phone: "+27713122891",
      image:
        "https://ucarecdn.com/d5a4c11c-8d4f-4c6b-9c4d-71677e8e0767/-/format/auto/",
      status: "In a meeting",
    },
  ]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const inputRef = useRef(null);
  const emojis = [
    "😊",
    "😂",
    "😍",
    "🥰",
    "😘",
    "😭",
    "😅",
    "🤣",
    "😉",
    "😎",
    "👍",
    "❤️",
    "🎉",
    "✨",
    "🔥",
    "💯",
    "🙏",
    "💪",
    "😴",
    "🫡",
    "🤔",
    "👋",
    "🙌",
    "💕",
    "😇",
    "🥺",
    "😬",
    "🤗",
    "🫂",
    "😋",
  ];

  useEffect(() => {
    const handleClickAway = (event) => {
      if (showAddMenu && !event.target.closest(".menu-container")) {
        setShowAddMenu(false);
      }
      if (showCallOptions && !event.target.closest(".call-menu-container")) {
        setShowCallOptions(false);
      }
      if (
        showAttachments &&
        !event.target.closest(".attachments-menu-container")
      ) {
        setShowAttachments(false);
      }
      if (isEmojiPickerOpen && !event.target.closest(".emoji-picker-react")) {
        setIsEmojiPickerOpen(false);
      }
    };

    if (
      showAddMenu ||
      showCallOptions ||
      showAttachments ||
      isEmojiPickerOpen
    ) {
      document.addEventListener("mousedown", handleClickAway);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [showAddMenu, showCallOptions, showAttachments, isEmojiPickerOpen]);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (showAddMenu && !event.target.closest(".menu-container")) {
        setShowAddMenu(false);
      }
    };
  }, [showAddMenu]);

  useEffect(() => {
    if (showLocationModal) {
      const loadGoogleMaps = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            setUserLocation({ lat, lng });
            setLocationError(null);

            const map = new window.google.maps.Map(
              document.getElementById("map"),
              {
                center: { lat, lng },
                zoom: 15,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }
            );

            new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#3B82F6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            nearbyFriends.forEach((friend) => {
              new window.google.maps.Marker({
                position: { lat: friend.lat, lng: friend.lng },
                map: map,
                title: friend.name,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#34D399",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
              });
            });

            const placesService = new window.google.maps.places.PlacesService(
              map
            );
            const searchInput = document.getElementById("places-search");
            const searchBox = new window.google.maps.places.SearchBox(
              searchInput
            );

            map.addListener("bounds_changed", () => {
              searchBox.setBounds(map.getBounds());
            });

            searchBox.addListener("places_changed", () => {
              const places = searchBox.getPlaces();
              if (places.length === 0) return;

              const bounds = new window.google.maps.LatLngBounds();
              places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) return;

                new window.google.maps.Marker({
                  map,
                  title: place.name,
                  position: place.geometry.location,
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#EF4444",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                  },
                });

                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
          },
          (error) => {
            setLocationError(
              "Please enable location services to use this feature"
            );
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };
    }
  }, [showLocationModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/integrations/web-scraping/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: "https://api.weather.com/v2/pws/observations/current?stationId=IGAUTENG67&format=json&units=m&apiKey=YOUR_API_KEY",
            getText: true,
          }),
        });

        const data = await response.text();
        if (data) {
          showNotification("Weather data updated successfully!");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (activeTab === "moments" && reelAutoPlay) {
      timer = setInterval(() => {
        setCurrentReelIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= reels.length) {
            return 0;
          }
          return nextIndex;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [activeTab, reels.length, reelAutoPlay]);

  useEffect(() => {
    let recognition;
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setNewMessage(transcript);
        setIsTyping(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening && recognition) {
      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEmojiPickerOpen &&
        !e.target.closest(".emoji-picker-container") &&
        !e.target.closest(".emoji-trigger")
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEmojiPickerOpen]);

  useEffect(() => {
    if (!isEmojiPickerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEmojiPickerOpen]);

  const onEmojiClick = (emojiData, event) => {
    const cursor = inputRef.current.selectionStart;
    const text =
      newMessage.slice(0, cursor) + emojiData.emoji + newMessage.slice(cursor);
    setNewMessage(text);

    // Focus back on input and set cursor position
    inputRef.current.focus();
    const newCursorPos = cursor + emojiData.emoji.length;
    inputRef.current.setSelectionRange(newCursorPos, newCursorPos);

    setIsTyping(true);
  };
  const showNotification = (message) => {
    setNotification(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragOffset(0);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const element = notificationRef.current;
    const rect = element.getBoundingClientRect();
    const offset = touch.clientX - rect.left;
    setDragOffset(offset);
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      setNotification(null);
    }
    setIsDragging(false);
    setDragOffset(0);
  };
  const handleSwipeStart = (e, chatId) => {
    setSwipeStart(e.touches[0].clientX);
  };
  const handleSwipeMove = (e, chatId) => {
    if (swipeStart === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - swipeStart;
    if (diff < -50) {
      setSwipedChat(chatId);
    } else if (diff > 50) {
      setSwipedChat(null);
    }
  };
  const handleSwipeEnd = () => {
    setSwipeStart(null);
  };
  const handleCall = async (chatId) => {
    try {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;

      setIsInCall(true);
      setCallType("voice");
      setCurrentCallUser(chat);
      showNotification(`Starting voice call with ${chat.name}...`);

      setTimeout(() => {
        showNotification(`Connected with ${chat.name}`);
      }, 1500);
    } catch (error) {
      showNotification("Failed to start call. Please try again.");
    }
    setSwipedChat(null);
  };
  const handleVideoCall = async (chatId) => {
    try {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;

      setIsInCall(true);
      setCallType("video");
      setCurrentCallUser(chat);
      showNotification(`Starting video call with ${chat.name}...`);

      setTimeout(() => {
        showNotification(`Connected with ${chat.name}`);
      }, 1500);
    } catch (error) {
      showNotification("Failed to start video call. Please try again.");
    }
    setSwipedChat(null);
  };
  const handleEndCall = () => {
    setIsInCall(false);
    setCallType(null);
    setCurrentCallUser(null);
    showNotification("Call ended");
  };
  const handleAddStory = async (file) => {
    try {
      const { url, error } = await upload({ file });
      if (error) {
        setUploadError(error);
        return;
      }
      const newStory = {
        id: stories.length + 1,
        name: "Your Story",
        image: url,
        hasUpdate: true,
      };
      setStories([newStory, ...stories.slice(1)]);
      showNotification("Story added successfully!");
    } catch (error) {
      setUploadError("Failed to upload story. Please try again.");
    }
  };
  const handleFileUpload = async (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      try {
        const { url, error } = await upload({ file });
        if (error) {
          setUploadError(error);
          return;
        }
        const newMsg = {
          id: Date.now(),
          senderId: 2,
          file: {
            url,
            type: file.type,
            name: file.name,
          },
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
        };
        setChatMessages((prev) => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
        }));
        setShowAttachments(false);
      } catch (error) {
        setUploadError("Failed to upload file. Please try again.");
      }
    }
  };
  const chats = [
    {
      id: 1,
      name: "Zi Ndebele",
      image:
        "https://ucarecdn.com/874df9a2-90b9-4505-8213-e303e1a0971b/-/format/auto/",
      lastMessage: "Dumela, how are you?",
      time: "2m ago",
      unread: 2,
      phone: "+27828028238",
    },
    {
      id: 2,
      name: "Given Hlongwane",
      lastMessage: "See you at the braai!",
      time: "15m ago",
      unread: 5,
      phone: "+27713122884",
    },
    {
      id: 3,
      name: "Bakang Mookodi",
      image:
        "https://ucarecdn.com/d9166dab-0e6a-48ee-9c29-da6f7f742e69/-/format/auto/",
      lastMessage: "Let's meet at the mall",
      time: "1h ago",
      unread: 0,
      phone: "+27713122885",
    },
    {
      id: 5,
      name: "Andy Songo",
      lastMessage: "The meeting is at 2pm",
      time: "45m ago",
      unread: 1,
      phone: "+27713122886",
    },
    {
      id: 6,
      name: "Romeo Lesolang",
      lastMessage: "Eita! Let's catch up soon",
      time: "4h ago",
      unread: 0,
      phone: "+27713122887",
    },
    {
      id: 7,
      name: "Phillip Ledwaba",
      lastMessage: "Ke teng! How's it going?",
      time: "5h ago",
      unread: 3,
      phone: "+27713122888",
    },
  ];
  const stories = [
    {
      id: 1,
      name: "Your Story",
      image:
        "https://ucarecdn.com/8656034c-136b-4714-8caa-fc9a10de201d/-/format/auto/",
      hasUpdate: false,
    },
    {
      id: 2,
      name: "Mickey",
      image:
        "https://ucarecdn.com/3f76c476-fc08-4428-a54d-9692b2e5fed4/-/format/auto/",
      storyImages: [
        "https://ucarecdn.com/08aa6f51-6369-4815-9957-f64787e75b43/",
        "https://ucarecdn.com/205a6881-c3ca-4d04-a5d0-229d8cecc05c/-/format/auto/",
        "https://ucarecdn.com/3e47735e-cba6-41c7-ae51-31b9dd3fed57/",
      ],
      hasUpdate: true,
    },
    {
      id: 3,
      name: "Lolah",
      image: "/avatar3.jpg",
      hasUpdate: true,
    },
    {
      id: 4,
      name: "Urus",
      image:
        "https://ucarecdn.com/93b78714-6d75-4aaa-be4f-ab38107aed8c/-/format/auto/",
      hasUpdate: true,
    },
    {
      id: 5,
      name: "Motshidisi",
      image:
        "https://ucarecdn.com/bcee26ee-0307-4cc3-b798-d2eb8eb8a382/-/format/auto/",
      hasUpdate: true,
    },
    {
      id: 6,
      name: "Phillip",
      image:
        "https://ucarecdn.com/538cf0a7-84bc-4799-ba0d-30219a9bd965/-/format/auto/",
      hasUpdate: true,
    },
  ];
  const [selectedChat, setSelectedChat] = useState(null);
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowAddMenu(false);
    setIsSearching(false);
  };
  const handleBackToChats = () => {
    setSelectedChat(null);
  };
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleCallLogClick = (log) => {
    const chatUser = chats.find((chat) => chat.name === log.name);
    if (chatUser) {
      setSelectedChat(chatUser);
      setActiveTab("chats");
    }
  };
  const handleMessageSubmit = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMsg = {
        id: Date.now(),
        senderId: 2,
        text: newMessage.trim(),
        timestamp: currentTime,
        status: "sent",
      };

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
      }));
      setNewMessage("");
      setIsTyping(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSubmit();
    }
  };
  const handleLineTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleLineTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleLineTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchEnd - touchStart;
    const isSwipeRight = distance > 50;

    if (isSwipeRight) {
      setIsChatbotExpanded(true);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">O'kae</h1>
          <div className="relative w-[200px]">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="relative menu-container">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <i className="fas fa-plus text-blue-600"></i>
            </button>
            {showAddMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[151]">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowNewChatModal(true);
                      setShowAddMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors"
                  >
                    <i className="fas fa-comment-alt mr-2 text-gray-500"></i>
                    New Chat
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors">
                    <i className="fas fa-user-plus mr-2 text-gray-500"></i>
                    New Contact
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors">
                    <i className="fas fa-users mr-2 text-gray-500"></i>
                    New Group
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors">
                    <i className="fas fa-calendar-plus mr-2 text-gray-500"></i>
                    New Event
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors">
                    <i className="fas fa-star mr-2 text-gray-500"></i>
                    New Status
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 hover:bg-gray-100 flex items-center transition-colors">
                    <i className="fas fa-robot mr-2 text-gray-500"></i>
                    Smart Assist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3mtlGRlfmywRG_SHTzq3XSIuJ8fClMA&libraries=places`}
      ></script>
      {notification && (
        <div
          ref={notificationRef}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-3 z-50 transition-opacity duration-500 opacity-90 animate-fade-in"
          style={{
            transform: `translate(calc(-50% + ${dragOffset}px), 0)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <p className="text-gray-800 font-roboto">{notification}</p>
        </div>
      )}
      {selectedChat ? (
        <div className="flex flex-col h-screen fixed inset-0 z-50 bg-[#111111]">
          <div className="bg-[#1a1a1a] text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center gap-3">
              <button onClick={handleBackToChats} className="p-2">
                <i className="fas fa-arrow-left text-lg"></i>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                  <img
                    src={selectedChat.image || "https://via.placeholder.com/40"}
                    alt={`${selectedChat.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-roboto font-semibold text-sm">
                    {selectedChat.name}
                  </h2>
                  <p className="text-[10px] text-gray-400">online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowCallOptions((prev) => !prev)}
                  className="p-2 hover:text-blue-500 transition-colors"
                >
                  <i className="fas fa-phone text-lg"></i>
                </button>
                {showCallOptions && (
                  <div className="absolute right-0 mt-2 w-[140px] bg-white rounded-lg shadow-lg z-10">
                    <button
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                      onClick={() => handleCall(selectedChat.id)}
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Voice Call
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                      onClick={() => handleVideoCall(selectedChat.id)}
                    >
                      <i className="fas fa-video mr-2"></i>
                      Video Call
                    </button>
                  </div>
                )}
              </div>
              <button className="p-2 hover:text-blue-500 transition-colors">
                <i className="fas fa-ellipsis-v text-lg"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 mt-[60px] mb-[80px]">
            <div className="space-y-4 mb-4">
              <div className="flex justify-center">
                <span className="bg-gray-800 text-gray-400 text-xs px-4 py-1 rounded-full">
                  Today
                </span>
              </div>
              {chatMessages[selectedChat.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === 1 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`${
                      message.senderId === 1
                        ? "bg-gray-800 text-white"
                        : "bg-blue-600 text-white"
                    } rounded-2xl p-3 max-w-[75%] relative`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-[10px] text-gray-200">
                        {message.timestamp}
                      </span>
                      {message.senderId === 2 && (
                        <i className="fas fa-check-double text-[10px] text-gray-200"></i>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-3 fixed bottom-0 left-0 right-0">
            <div className="flex items-center gap-2 w-full max-w-screen-sm mx-auto">
              <div className="relative attachments-menu-container">
                <button
                  onClick={() => setShowAttachments(!showAttachments)}
                  className="flex-none p-2 text-gray-400 hover:text-blue-500"
                >
                  <i className="fas fa-plus text-lg"></i>
                </button>
                {showAttachments && (
                  <div className="absolute bottom-16 left-0 bg-[#2a2a2a] rounded-lg shadow-lg p-2 w-[200px]">
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex flex-col items-center p-2 hover:bg-[#3a3a3a] rounded-lg cursor-pointer">
                        <i className="fas fa-image text-blue-500 text-xl"></i>
                        <span className="text-xs text-gray-300 mt-1">
                          Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <label className="flex flex-col items-center p-2 hover:bg-[#3a3a3a] rounded-lg cursor-pointer">
                        <i className="fas fa-video text-red-500 text-xl"></i>
                        <span className="text-xs text-gray-300 mt-1">
                          Video
                        </span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <label className="flex flex-col items-center p-2 hover:bg-[#3a3a3a] rounded-lg cursor-pointer">
                        <i className="fas fa-file-alt text-green-500 text-xl"></i>
                        <span className="text-xs text-gray-300 mt-1">
                          Document
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleMessageSubmit();
                    }
                  }}
                  className="flex-1 bg-transparent text-white text-sm outline-none min-w-0"
                />
                <div className="relative">
                  <button
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    className="flex-none p-2 text-gray-400 hover:text-blue-500"
                  >
                    <i className="fas fa-smile text-lg"></i>
                  </button>
                  {isEmojiPickerOpen && (
                    <div className="absolute bottom-12 right-0 bg-[#2a2a2a] rounded-lg shadow-lg p-2 w-[240px] z-50">
                      <div className="grid grid-cols-6 gap-1">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              const cursor = inputRef.current.selectionStart;
                              const text =
                                newMessage.slice(0, cursor) +
                                emoji +
                                newMessage.slice(cursor);
                              setNewMessage(text);
                              inputRef.current.focus();
                            }}
                            className="p-2 text-xl hover:bg-[#3a3a3a] rounded transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  if (isTyping) {
                    handleMessageSubmit();
                  } else {
                    setIsListening(!isListening);
                  }
                }}
                className="flex-none p-2 text-gray-400 hover:text-blue-500"
              >
                <i
                  className={`fas ${
                    isTyping ? "fa-paper-plane" : "fa-microphone"
                  } text-lg ${isListening ? "text-red-500 animate-pulse" : ""}`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {activeTab !== "moments" && (
            <div className="bg-white p-2 relative">
              <div className="stories-container overflow-hidden relative">
                <div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x py-2">
                  <div className="flex-shrink-0 snap-start">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div
                          className="w-[60px] h-[60px] rounded-full border-2 border-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden"
                          onClick={() => {
                            const newStatus = prompt("Update your status:");
                            if (newStatus?.trim()) {
                              setStatusUpdate(newStatus);
                              showNotification("Status updated successfully!");
                            }
                          }}
                        >
                          <img
                            src="https://ucarecdn.com/8656034c-136b-4714-8caa-fc9a10de201d/-/format/auto/"
                            alt="Your story"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <label
                          htmlFor="story-upload"
                          className="absolute bottom-0 right-0"
                        >
                          <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs shadow-lg transform transition-transform hover:scale-110 cursor-pointer">
                            <i className="fas fa-plus"></i>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="story-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleAddStory(e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                      <span className="text-xs mt-2 font-roboto">
                        Your Story
                      </span>
                      {statusUpdate && (
                        <span className="text-xs text-gray-500 mt-1 truncate max-w-[60px] text-center">
                          {statusUpdate}
                        </span>
                      )}
                    </div>
                  </div>
                  {stories.slice(1).map((story) => (
                    <div
                      key={story.id}
                      className="flex-shrink-0 snap-start"
                      onClick={() => {
                        setViewedStories(
                          (prev) => new Set([...prev, story.id])
                        );
                        setSelectedStory(story);
                        setShowStoryModal(true);
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div
                            className={`w-[60px] h-[60px] rounded-full overflow-hidden ${
                              viewedStories.has(story.id)
                                ? "ring-2 ring-gray-300"
                                : "ring-2 ring-blue-500"
                            } cursor-pointer transition-all duration-300 hover:scale-105`}
                          >
                            <img
                              src={story.image}
                              alt={`${story.name}'s story`}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-xs mt-2 font-roboto text-center">
                          {story.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                onTouchStart={handleLineTouchStart}
                onTouchMove={handleLineTouchMove}
                onTouchEnd={handleLineTouchEnd}
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[100px] h-[16px] bg-blue-500 rounded-b-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 z-50 shadow-md -bottom-4"
              >
                <span className="text-white text-xs">Smart Assist</span>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "chats" && (
              <div className="space-y-2 p-4">
                {filteredChats.map((chat) => (
                  <div key={chat.id} className="relative overflow-hidden">
                    <div
                      className="bg-white p-4 rounded-lg flex items-center justify-between shadow-sm cursor-pointer transform transition-transform relative border-r-4 border-blue-500"
                      style={{
                        transform: `translateX(${
                          swipedChat === chat.id ? "-80px" : "0"
                        })`,
                        transition: "transform 0.3s ease",
                      }}
                      onClick={() => handleChatSelect(chat)}
                      onTouchStart={(e) => handleSwipeStart(e, chat.id)}
                      onTouchMove={(e) => handleSwipeMove(e, chat.id)}
                      onTouchEnd={handleSwipeEnd}
                    >
                      <div className="flex items-center space-x-3">
                        {chat.name === "Zi Ndebele" ? (
                          <img
                            src="https://ucarecdn.com/874df9a2-90b9-4505-8213-e303e1a0971b/-/format/auto/"
                            alt="Zi Ndebele profile"
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        ) : chat.name === "Bakang Mookodi" ? (
                          <img
                            src="https://ucarecdn.com/d9166dab-0e6a-48ee-9c29-da6f7f742e69/-/format/auto/"
                            alt="Bakang Mookodi profile"
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        ) : chat.name === "Andy Songo" ? (
                          <img
                            src="https://ucarecdn.com/8164fbb5-b4f9-4696-98a2-b87088df9597/-/format/auto/"
                            alt="Andy Songo profile"
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        ) : chat.name === "Given Hlongwane" ? (
                          <img
                            src="https://ucarecdn.com/c3d75418-e1a4-409b-bbdd-02088e08f079/-/format/auto/"
                            alt="Given Hlongwane profile"
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-[50px] h-[50px] rounded-full bg-gray-200"></div>
                        )}
                        <div>
                          <h3 className="font-semibold font-roboto">
                            {chat.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{chat.time}</p>
                        {chat.unread > 0 && (
                          <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="absolute right-0 top-0 h-full flex flex-col justify-center gap-2 bg-gradient-to-l from-gray-100 to-transparent px-4"
                      style={{
                        opacity: swipedChat === chat.id ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: swipedChat === chat.id ? "auto" : "none",
                        width: "80px",
                      }}
                    >
                      <button
                        className="h-[35px] w-[35px] rounded-full bg-blue-500 flex items-center justify-center text-white transform transition-all hover:scale-110 hover:bg-blue-600"
                        onClick={() => handleCall(chat.id)}
                      >
                        <i className="fas fa-phone text-sm"></i>
                      </button>
                      <button
                        className="h-[35px] w-[35px] rounded-full bg-green-500 flex items-center justify-center text-white transform transition-all hover:scale-110 hover:bg-green-600"
                        onClick={() => handleVideoCall(chat.id)}
                      >
                        <i className="fas fa-video text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showLocationModal && (
              <div className="fixed inset-0 bg-[#111111] z-50 flex flex-col h-screen w-screen">
                <div className="bg-[#1a1a1a] text-white px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowLocationModal(false)}
                      className="p-2"
                    >
                      <i className="fas fa-arrow-left text-lg"></i>
                    </button>
                    <h2 className="font-roboto font-semibold text-lg">
                      Location
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={locationPrivacy}
                      onChange={(e) => setLocationPrivacy(e.target.value)}
                      className="bg-[#2a2a2a] text-white border-none rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="friends">👥 Friends Only</option>
                      <option value="public">🌍 Public</option>
                      <option value="none">🔒 Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#111111] px-4 py-3">
                  {locationError ? (
                    <div className="bg-red-900/50 text-red-100 p-4 rounded-lg">
                      {locationError}
                    </div>
                  ) : userLocation ? (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden">
                        <div id="map" className="h-[40vh] w-full"></div>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-lg p-4">
                        <h3 className="font-roboto font-semibold text-white mb-4">
                          Nearby Friends
                        </h3>
                        <div className="space-y-4">
                          {nearbyFriends.map((friend) => (
                            <div
                              key={friend.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                  <img
                                    src={friend.image}
                                    alt={`${friend.name}'s profile`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-roboto text-white">
                                    {friend.name}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {friend.distance}
                                  </p>
                                </div>
                              </div>
                              <button className="text-blue-400 hover:text-blue-300">
                                <i className="fas fa-location-arrow"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-lg p-4">
                        <h3 className="font-roboto font-semibold text-white mb-4">
                          Nearby Places
                        </h3>
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              id="places-search"
                              placeholder="Search places..."
                              className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg pl-10"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          </div>
                          <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
                            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-full whitespace-nowrap">
                              🍽️ Restaurants
                            </button>
                            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-full whitespace-nowrap">
                              🎬 Entertainment
                            </button>
                            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-full whitespace-nowrap">
                              🏪 Shopping
                            </button>
                            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-full whitespace-nowrap">
                              ☕ Cafes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                <div className="bg-[#1a1a1a] p-4 border-t border-[#2a2a2a]">
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-roboto hover:bg-blue-600 transition-colors">
                    Share Location
                  </button>
                </div>
              </div>
            )}
            {activeTab === "moments" && (
              <div className="flex flex-col h-[calc(100vh-180px)] gap-4 p-4">
                <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-roboto text-xl font-semibold">
                      Suggestion Reels
                    </h2>
                    <button
                      onClick={() => setReelAutoPlay(!reelAutoPlay)}
                      className={`text-gray-600 hover:text-blue-500 transition-colors ${
                        reelAutoPlay ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <i
                        className={`fas fa-${reelAutoPlay ? "pause" : "play"}`}
                      ></i>
                    </button>
                  </div>
                  <div className="relative h-[calc(100%-70px)]">
                    <div
                      className="flex h-full transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentReelIndex * 100}%)`,
                      }}
                    >
                      {reels.map((reel, index) => (
                        <div
                          key={reel.id}
                          className="w-full h-full flex-shrink-0 relative group cursor-pointer"
                        >
                          <img
                            src={reel.media}
                            alt={reel.content}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                                <img
                                  src={reel.media}
                                  alt={reel.user}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{reel.user}</h3>
                                <p className="text-sm text-gray-200">Follow</p>
                              </div>
                            </div>
                            <p className="mb-3 text-sm">{reel.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 group">
                                  <i className="fas fa-heart transform group-hover:scale-110 transition-transform"></i>
                                  <span className="text-sm">{reel.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 group">
                                  <i className="fas fa-comment transform group-hover:scale-110 transition-transform"></i>
                                  <span className="text-sm">
                                    {reel.comments}
                                  </span>
                                </button>
                                <button className="flex items-center gap-2 group">
                                  <i className="fas fa-share transform group-hover:scale-110 transition-transform"></i>
                                  <span className="text-sm">{reel.shares}</span>
                                </button>
                              </div>
                              <button className="transform hover:scale-110 transition-transform">
                                <i className="fas fa-ellipsis-h"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
                      <button
                        onClick={() => {
                          if (currentReelIndex > 0) {
                            setCurrentReelIndex((prev) => prev - 1);
                          }
                        }}
                        className="w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (currentReelIndex < reels.length - 1) {
                            setCurrentReelIndex((prev) => prev + 1);
                          }
                        }}
                        className="w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
                      {reels.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            index === currentReelIndex
                              ? "w-6 bg-white"
                              : "w-2 bg-gray-400"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "profile" && (
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="relative h-[150px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg">
                    <div className="absolute -bottom-16 left-4">
                      <div className="w-[120px] h-[120px] rounded-full border-4 border-white bg-gray-200">
                        <img
                          src="https://ucarecdn.com/75ca2e28-0308-472f-b0a7-d275564136f3/-/format/auto/"
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg">
                      <i className="fas fa-camera text-gray-600"></i>
                    </button>
                  </div>
                  <div className="pt-20 px-4 pb-4">
                    <h2 className="text-xl font-semibold font-roboto">
                      Miles Jonas
                    </h2>
                    <p className="text-gray-600">@milesjonas</p>
                    <p className="text-gray-600 mt-1">
                      <i className="fas fa-phone mr-2"></i>
                      <a href="tel:+27713122883">+27 713122883</a>
                    </p>
                    <p className="mt-2 text-gray-700">
                      Living life one code at a time 💻
                    </p>
                    <div className="status-update-container mt-4 bg-white rounded-lg shadow-sm">
                      <div className="status-header flex items-center p-4 border-b border-gray-200">
                        <img
                          src="https://ucarecdn.com/75ca2e28-0308-472f-b0a7-d275564136f3/-/format/auto/"
                          alt="Profile"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="user-info">
                          <h3 className="font-roboto text-base font-semibold">
                            Miles Jonas
                          </h3>
                          <select
                            value={statusVisibility}
                            onChange={(e) =>
                              setStatusVisibility(e.target.value)
                            }
                            className="text-sm text-gray-600 bg-transparent border-none outline-none"
                          >
                            <option value="public">🌍 Public</option>
                            <option value="friends">👥 Friends Only</option>
                            <option value="private">🔒 Private</option>
                          </select>
                        </div>
                      </div>
                      <div className="status-content p-4">
                        <textarea
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                          placeholder="What's on your mind?"
                          className="w-full border-none outline-none resize-none text-base"
                          rows="4"
                        />
                        {statusImage && (
                          <div className="mt-2 relative">
                            <img
                              src={statusImage}
                              alt="Status preview"
                              className="w-full h-[200px] object-cover rounded-lg"
                            />
                            <button
                              onClick={() => setStatusImage(null)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="status-footer flex justify-between items-center p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor="status-image"
                            className="cursor-pointer hover:text-blue-500"
                          >
                            <i className="fas fa-image text-xl"></i>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files) {
                                const file = e.target.files[0];
                                const { url, error } = await upload({ file });
                                if (error) {
                                  setUploadError(error);
                                  return;
                                }
                                setStatusImage(url);
                              }
                            }}
                            className="hidden"
                            id="status-image"
                          />
                          <button className="hover:text-blue-500">
                            <i className="fas fa-smile text-xl"></i>
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            if (statusUpdate.trim() || statusImage) {
                              const mentions =
                                statusUpdate.match(/@\w+/g) || [];
                              setMoments([
                                {
                                  id: moments.length + 1,
                                  user: "Miles Jonas",
                                  content: statusUpdate,
                                  image: statusImage,
                                  visibility: statusVisibility,
                                  time: "Just now",
                                  likes: 0,
                                  mentions,
                                },
                                ...moments,
                              ]);
                              setStatusUpdate("");
                              setStatusImage(null);
                              showNotification("Status updated successfully!");
                            }
                          }}
                          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <div className="text-center">
                        <div className="font-semibold">245</div>
                        <div className="text-sm text-gray-600">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">1.2K</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">85</div>
                        <div className="text-sm text-gray-600">Moments</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Edit Profile
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 mt-2">
                        Share Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "rides" && (
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-4 font-roboto text-lg">
                    Call History
                  </h3>
                  <div className="space-y-4">
                    {callLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          log.status === "missed" ? "bg-red-50" : "bg-gray-50"
                        } cursor-pointer hover:bg-gray-100 transition-colors`}
                        onClick={() => handleCallLogClick(log)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                            <img
                              src={log.image}
                              alt={`${log.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-roboto font-semibold">
                              {log.name}
                            </p>
                            <div className="flex items-center text-sm">
                              <i
                                className={`fas fa-phone${
                                  log.type === "incoming" ? "-alt" : ""
                                } ${
                                  log.status === "missed"
                                    ? "text-red-500"
                                    : "text-green-500"
                                } mr-2 ${
                                  log.type === "outgoing"
                                    ? "rotate-90"
                                    : log.type === "incoming"
                                    ? "-rotate-90"
                                    : ""
                                }`}
                              ></i>
                              <span
                                className={`${
                                  log.status === "missed"
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                              >
                                {log.type === "missed"
                                  ? "Missed Call"
                                  : `${log.duration}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{log.time}</p>
                          <p className="text-xs text-gray-400">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {isChatbotExpanded && (
            <div
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out"
              style={{
                transform: isChatbotExpanded
                  ? "translateX(0)"
                  : "translateX(-100%)",
              }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-robot text-white text-sm" />
                  </div>
                  <h2 className="text-lg font-semibold">O'kae Assistant</h2>
                </div>
                <button
                  onClick={() => setIsChatbotExpanded(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {aiMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiInputMessage}
                    onChange={(e) => setAiInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAiMessageSubmit();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAiMessageSubmit}
                    disabled={isAiTyping}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowLocationModal(true)}
            className="fixed bottom-20 left-[18px] bg-[#34D399] text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-[#2AB380] transition-colors transform hover:translate-y-[-1px] hover:shadow-xl"
          >
            <i className="fas fa-map-marker-alt text-[14px]"></i>
          </button>
          {uploadError && (
            <div className="fixed bottom-40 right-4 bg-red-100 text-red-700 p-2 rounded-lg">
              {uploadError}
            </div>
          )}
          {showStoryModal && selectedStory && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedStory.image}
                      alt={`${selectedStory.name}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="font-semibold text-lg">
                      {selectedStory.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowStoryModal(false);
                      setSelectedStory(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {selectedStory.name === "Mickey" &&
                  selectedStory.storyImages ? (
                    <div className="w-full h-full relative">
                      {selectedStory.storyImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedStory.name}'s story ${index + 1}`}
                          className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500"
                          style={{ opacity: index === 0 ? 1 : 0 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={selectedStory.image}
                      alt={`${selectedStory.name}'s story`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {showNewChatModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-md mx-4">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">New Chat</h2>
                  <button
                    onClick={() => setShowNewChatModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="p-4">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>

                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {contacts
                      .filter(
                        (contact) =>
                          contact.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          contact.phone.includes(searchQuery)
                      )
                      .map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            const existingChat = chats.find(
                              (chat) => chat.id === contact.id
                            );
                            if (!existingChat) {
                              const newChat = {
                                id: contact.id,
                                name: contact.name,
                                image: contact.image,
                                lastMessage: "",
                                time: "Just now",
                                unread: 0,
                                phone: contact.phone,
                              };
                              setChats((prevChats) => [newChat, ...prevChats]);
                              setChatMessages((prev) => ({
                                ...prev,
                                [contact.id]: [],
                              }));
                              setSelectedChat(newChat);
                            } else {
                              setSelectedChat(existingChat);
                            }
                            setShowNewChatModal(false);
                            setShowAddMenu(false);
                          }}
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                            <img
                              src={contact.image}
                              alt={contact.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm text-gray-500">
                              {contact.status}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.phone}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowNewChatModal(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className="bg-white border-t flex justify-around p-4">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex flex-col items-center ${
            activeTab === "chats" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <i className="fas fa-comments text-xl"></i>
          <span className="text-xs mt-1 font-roboto">Chats</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("rides");
            setShowCallLogs(true);
          }}
          className={`flex flex-col items-center ${
            activeTab === "rides" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <i className="fas fa-phone text-xl"></i>
          <span className="text-xs mt-1 font-roboto">Calls</span>
        </button>
        <button
          onClick={() => setActiveTab("moments")}
          className={`flex flex-col items-center ${
            activeTab === "moments" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <i className="fas fa-users text-xl"></i>
          <span className="text-xs mt-1 font-roboto">Socials</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${
            activeTab === "profile" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <i className="fas fa-user text-xl"></i>
          <span className="text-xs mt-1 font-roboto">Me</span>
        </button>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 0.9;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-in {
          from {
            transform: translateX(80px);
          }
          to {
            transform: translateX(0);
          }
        }
        .slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes story-pulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
        .animate-p`}</style>
    </div>
  );
}

export default MainComponent;
