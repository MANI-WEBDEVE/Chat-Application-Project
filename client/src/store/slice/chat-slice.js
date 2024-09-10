export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  directMessageContact: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),


  setDirectMessageContact: (directMessageContact) =>
    set({ directMessageContact }),
  // TODO: implement the code to add the new contact to the existing list
  addDirectMessageContact: (newContact) => {
    const directMessageContact = get().directMessageContact;
    const newContactList = [...directMessageContact, newContact];
    set({ directMessageContact: newContactList });
  },

  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessage: [],
    }),
  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
