import company_icon from "../assets/company-icon.png";
import MoreIcon from "../assets/click-to-open-chat.png";
import { FaLocationArrow } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { getFreshIdToken, getUid } from "@/firebase/authUtils";
import { useScrollToBottomOnNewMessages } from "@/components/hooks/useScrollToBottom";
export function MessageTemplate() {
	const [usersData, setUsersData] = useState([]);
	const [receiverUser, setReceiverUser] = useState(null);
	const [messageInput, setMessageInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [loadingOlder, setLoadingOlder] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(false);

	const currentUserId = getUid();

	const wsRef = useRef(null);
	const chatContainerRef = useRef();

	// 📜 Hook: Scroll on new incoming messages (if user is at bottom)
	useScrollToBottomOnNewMessages(messages, chatContainerRef);

	// 🔷 WebSocket
	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8765");
		wsRef.current = socket;

		socket.onopen = () => {
			console.log("WebSocket connected");
			socket.send(JSON.stringify({ type: "register", user_id: currentUserId }));
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setMessages((prev) => [
				...prev,
				{
					sender_uid: data.from,
					receiver_uid: currentUserId,
					content: data.text,
					read_status: false,
				},
			]);
			setTimeout(() => {
				if (chatContainerRef.current) {
					chatContainerRef.current.scrollTo({
						top: chatContainerRef.current.scrollHeight,
						behavior: "smooth",
					});
				}
			}, 100);
		};

		return () => {
			if (wsRef.current?.readyState === 1) {
				socket.close();
			}
			console.log("WebSocket closed");
		};
	}, [currentUserId]);

	// 🔷 Fetch users on mount
	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const token = await getFreshIdToken(true);
			const response = await axios.get("http://localhost:8000/api/profile", {
				headers: { Authorization: `Bearer ${token}` },
			});

			const formattedUsers = (response.data || [])
				.filter((user) => user?.uid && user.uid !== currentUserId)
				.map((user) => ({
					uid: user.uid,
					username: user.username || "unknown",
					profile_picture: user.profile_picture || "unavailable",
					mime_type: user.mime_type || "image/png",
				}));

			setUsersData(formattedUsers);
			console.log("Fetched users:", formattedUsers);
		} catch (error) {
			console.error("Error fetching users:", error);
			setUsersData([]);
		}
	};

	// 🔷 Send message
	const sendMessage = () => {
		if (!receiverUser?.uid || !messageInput.trim()) return;

		if (wsRef.current?.readyState === 1) {
			wsRef.current.send(
				JSON.stringify({ to: receiverUser.uid, text: messageInput.trim() })
			);

			setMessages((prev) => {
				const updated = [
					...prev,
					{
						sender_uid: currentUserId,
						receiver_uid: receiverUser.uid,
						content: messageInput,
						read_status: false,
					},
				];

				// wait for DOM update & scroll
				setTimeout(() => {
					if (chatContainerRef.current) {
						chatContainerRef.current.scrollTo({
							top: chatContainerRef.current.scrollHeight,
							behavior: "smooth",
						});
					}
				}, 0);

				return updated;
			});

			setMessageInput("");
		} else {
			console.error("WebSocket not ready");
		}
	};

	// 🔷 Fetch messages
	const fetchMessages = async (
		sender,
		receiver,
		before = null,
		initialLoad = false
	) => {
		setLoadingOlder(true);
		try {
			const token = await getFreshIdToken(true);
			let url = `http://localhost:8000/api/get_messages/${sender}/${receiver}`;
			if (before) {
				url += `?before=${encodeURIComponent(before)}`;
			}

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			const data = response.data;

			if (Array.isArray(data)) {
				if (before) {
					setMessages((prev) => [...data.reverse(), ...prev]);
				} else {
					setMessages(data.reverse());
				}
			} else {
				if (before) {
					setMessages((prev) => [...data.messages.reverse(), ...prev]);
				} else {
					setMessages(data.messages.reverse());
				}
				setHasMore(data.has_more);
			}

			if (initialLoad) {
				// force scroll to bottom
				setTimeout(() => {
					if (chatContainerRef.current) {
						chatContainerRef.current.scrollTo({
							top: chatContainerRef.current.scrollHeight,
							behavior: "smooth",
						});
					}
				}, 300);
				setIsInitialLoad(false);
			}
		} catch (error) {
			console.error("Error fetching messages:", error);
		} finally {
			setLoadingOlder(false);
		}
	};

	// 🔷 Load older messages on scroll
	const loadOlderMessages = () => {
		if (!messages.length || !hasMore || loadingOlder) return;

		const oldest = messages[0]?.timestamp;
		if (oldest) {
			fetchMessages(currentUserId, receiverUser?.uid, oldest);
		}
	};

	// 🔷 Attach scroll listener for loading older
	useEffect(() => {
		const onScroll = () => {
			if (!chatContainerRef.current) return;

			if (chatContainerRef.current.scrollTop === 0) {
				loadOlderMessages();
			}
		};

		const node = chatContainerRef.current;
		if (node) {
			node.addEventListener("scroll", onScroll);
		}

		return () => {
			if (node) {
				node.removeEventListener("scroll", onScroll);
			}
		};
	}, [messages, hasMore]);
	return (
		<section className="flex h-fit pb-10">
			{/* Side Panel */}
			<div className="w-3/12 bg-gray-200 h-full ml-7 mt-6 rounded-sm p-5 flex flex-col">
				<h1 className="text-2xl font-bold">Messages</h1>
				{usersData.length > 0 ? (
					usersData.map((user) => (
						<div
							key={user.uid}
							onClick={() => {
								setReceiverUser(user);
								setIsInitialLoad(true);
								fetchMessages(currentUserId, user.uid, null, true);
							}}
							className={`flex items-center bg-gray-100 rounded-sm border-b-2 border-gray-300 p-3 mt-4 cursor-pointer transition-all duration-300
								${
									receiverUser?.uid === user.uid
										? "border-l-[6px] border-l-green-500 bg-green-50"
										: "border-l-[6px] border-transparent hover:border-l-blue-500 hover:bg-blue-50"
								}`}
						>
							<img
								className="h-16 w-16 rounded-full object-cover m-2"
								src={
									user.profile_picture !== "unavailable"
										? `data:${user.mime_type};base64,${user.profile_picture}`
										: company_icon
								}
								alt={user.username}
							/>
							<div className="ml-6">
								<p className="text-md font-bold">{user.username}</p>
							</div>
						</div>
					))
				) : (
					<p className="mt-4 inline-block bg-gray-100 text-red-500 text-md font-semibold p-3 rounded-sm shadow-sm">
						No users found
					</p>
				)}
			</div>

			{/* Chat Panel */}
			<div className="bg-gray-200 ml-16 w-6/12 h-fit mt-6 rounded-lg">
				{!receiverUser ? (
					// 🌸 Landing Page
					<div className="flex flex-col items-center justify-center h-full text-black py-24">
						<img src={MoreIcon} alt="Chat" className="w-40 mb-6 opacity-70" />
						<p className="text-2xl font-bold">Welcome to Messages</p>
						<p className="text-lg mt-2 text-gray-500">
							Select a user from the left to start chatting
						</p>
					</div>
				) : (
					<>
						{/* Header */}
						<div className="flex justify-between border-b-2 border-gray-300 items-center p-3">
							<img
								src={
									receiverUser?.profile_picture !== "unavailable"
										? `data:${receiverUser?.mime_type};base64,${receiverUser?.profile_picture}`
										: company_icon
								}
								className="h-16 w-16 rounded-full object-cover m-2"
								alt={receiverUser?.username || "Unknown"}
							/>
							<p className="text-xl font-bold">
								{receiverUser?.username || "Unknown"}
							</p>
							<div className="w-14"></div>
						</div>

						{/* Messages */}
						<div className="font-sans">
							<div className="font-sans">
								<div
									className="w-full bg-white h-80 overflow-y-scroll p-4 space-y-2"
									ref={chatContainerRef}
								>
									{messages.length > 0 ? (
										messages.map((msg, idx) => {
											const isCurrentUser = msg.sender_uid === currentUserId;
											return (
												<div
													key={idx}
													className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
												>
													<div
														className={`max-w-xs p-2 rounded-xl text-sm ${
															isCurrentUser
																? "bg-blue-500 text-white"
																: "bg-gray-300 text-gray-800"
														}`}
													>
														<p className="font-bold text-xs mb-1">
															{isCurrentUser
																? "You"
																: receiverUser?.username || "Unknown"}
														</p>
														<p>{msg.content}</p>
													</div>
												</div>
											);
										})
									) : (
										<p className="text-gray-500 text-center">No messages yet</p>
									)}
								</div>
							</div>

							{/* Input */}
							<div className="mt-6 flex flex-col mb-6 bg-white">
								<input
									type="text"
									placeholder="Enter message here"
									className="h-20 w-full p-4 text-sm focus:outline-none focus:border-b-4 focus:border-blue-400 ease-linear duration-150"
									value={messageInput}
									onChange={(e) => setMessageInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											sendMessage();
										}
									}}
								/>

								<div className="flex flex-row justify-between p-4">
									<div className="hover:bg-blue-200 hover:text-blue-700 p-2 rounded-xl cursor-pointer">
										<IoDocumentAttachOutline className="text-2xl" />
									</div>
									<div className="p-3 hover:text-blue-700 cursor-pointer">
										<FaLocationArrow
											className="text-xl"
											onClick={sendMessage}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
